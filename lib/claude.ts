import Anthropic from '@anthropic-ai/sdk'
import { QuestionnaireData } from './types'

function getAnthropic() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
}

function parseClaudeJson(text: string): { lyrics?: string; murekaPrompt?: string } {
  let cleaned = text.trim()

  const fenced = cleaned.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/i)
  if (fenced) {
    cleaned = fenced[1].trim()
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/, '').trim()
  }

  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1)
  }

  return JSON.parse(cleaned) as { lyrics?: string; murekaPrompt?: string }
}

export async function generateLyricsAndPrompt(
  data: QuestionnaireData
): Promise<{ lyrics: string; murekaPrompt: string }> {
  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 3000,
    system:
      'You are a professional songwriter. You write emotionally resonant, personalised song lyrics. You always respond with valid JSON only — no markdown, no preamble.',
    messages: [
      {
        role: 'user',
        content: `Write a personalised song for:
- Recipient name: ${data.recipientName}
- Occasion: ${data.occasion}${data.occasionDetails ? ` — ${data.occasionDetails}` : ''}
- Memories/details: ${data.memories}
- Artist style inspiration: ${data.artistStyle}

Return JSON with two keys:
- "lyrics": complete song with [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Chorus] labels, personalised with the recipient's name and memories, suitable for 2.5–3 minutes of singing
- "murekaPrompt": under 200 characters describing musical style, tempo, mood, and instrumentation matching the artist style`,
      },
    ],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude returned no text content')
  }

  try {
    const parsed = parseClaudeJson(textBlock.text)
    if (!parsed.lyrics || !parsed.murekaPrompt) {
      throw new Error('Missing lyrics or murekaPrompt in Claude response')
    }
    return { lyrics: parsed.lyrics, murekaPrompt: parsed.murekaPrompt }
  } catch {
    throw new Error(`Failed to parse Claude JSON response: ${textBlock.text.slice(0, 200)}`)
  }
}
