import axios from 'axios'

const MUREKA_BASE = 'https://api.mureka.ai'

export async function generateSong(prompt: string, lyrics: string): Promise<string> {
  const { data: job } = await axios.post(
    `${MUREKA_BASE}/v1/song/generate`,
    { prompt, lyrics, model: 'auto' },
    { headers: { Authorization: `Bearer ${process.env.MUREKA_API_KEY}` } }
  )

  const taskId = job.task_id
  if (!taskId) {
    throw new Error('Mureka did not return a task_id')
  }

  const start = Date.now()
  while (Date.now() - start < 180000) {
    await new Promise((r) => setTimeout(r, 3000))

    const { data: status } = await axios.get(
      `${MUREKA_BASE}/v1/song/query?task_id=${taskId}`,
      { headers: { Authorization: `Bearer ${process.env.MUREKA_API_KEY}` } }
    )

    if (status.status === 'succeed') {
      const url = status.songs?.[0]?.url
      if (!url) throw new Error('Mureka succeeded but returned no song URL')
      return url
    }

    if (status.status === 'failed') {
      throw new Error(`Mureka generation failed: ${status.error ?? 'unknown error'}`)
    }
  }

  throw new Error('Mureka generation timed out after 3 minutes')
}
