import axios from 'axios'

const MUREKA_BASE = 'https://api.mureka.ai'

type MurekaGenerateResponse = {
  id?: string
  task_id?: string
  status?: string
  trace_id?: string
  error?: { message?: string }
}

type MurekaSongChoice = {
  url?: string
}

type MurekaQueryResponse = {
  status?: string
  failed_reason?: string
  error?: string
  songs?: MurekaSongChoice[]
  choices?: MurekaSongChoice[]
}

function getMurekaHeaders() {
  return {
    Authorization: `Bearer ${process.env.MUREKA_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

function extractTaskId(response: MurekaGenerateResponse): string | undefined {
  return response.id ?? response.task_id
}

function extractSongUrl(response: MurekaQueryResponse): string | undefined {
  return response.choices?.[0]?.url ?? response.songs?.[0]?.url
}

function isSucceeded(status: string | undefined): boolean {
  return status === 'succeeded' || status === 'succeed'
}

function isFailed(status: string | undefined): boolean {
  return status === 'failed' || status === 'timeouted' || status === 'cancelled'
}

export async function generateSong(prompt: string, lyrics: string): Promise<string> {
  let job: MurekaGenerateResponse
  try {
    const { data } = await axios.post<MurekaGenerateResponse>(
      `${MUREKA_BASE}/v1/song/generate`,
      { prompt, lyrics, model: 'auto' },
      { headers: getMurekaHeaders() }
    )
    job = data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error?.message ??
        error.response?.data?.message ??
        error.message
      throw new Error(`Mureka generate request failed: ${message}`)
    }
    throw error
  }

  const taskId = extractTaskId(job)
  if (!taskId) {
    const detail = JSON.stringify(job).slice(0, 300)
    throw new Error(`Mureka did not return a task id (response: ${detail})`)
  }

  const start = Date.now()
  while (Date.now() - start < 180000) {
    await new Promise((r) => setTimeout(r, 3000))

    const { data: status } = await axios.get<MurekaQueryResponse>(
      `${MUREKA_BASE}/v1/song/query/${taskId}`,
      { headers: getMurekaHeaders() }
    )

    if (isSucceeded(status.status)) {
      const url = extractSongUrl(status)
      if (!url) throw new Error('Mureka succeeded but returned no song URL')
      return url
    }

    if (isFailed(status.status)) {
      throw new Error(
        `Mureka generation failed: ${status.failed_reason ?? status.error ?? status.status ?? 'unknown error'}`
      )
    }
  }

  throw new Error('Mureka generation timed out after 3 minutes')
}
