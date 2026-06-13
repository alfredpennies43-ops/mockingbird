import Anthropic from '@anthropic-ai/sdk'
import { QuestionnaireData } from './types'

function getAnthropic() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
}

export async function generateLyricsAndPrompt(
  data: QuestionnaireData
): Promise<{ lyrics: string; murekaPrompt: string }> {
  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
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
    const parsed = JSON.parse(textBlock.text) as {
      lyrics?: string
      murekaPrompt?: string
    }
    if (!parsed.lyrics || !parsed.murekaPrompt) {
      throw new Error('Missing lyrics or murekaPrompt in Claude response')
    }
    return { lyrics: parsed.lyrics, murekaPrompt: parsed.murekaPrompt }
  } catch {
    throw new Error(`Failed to parse Claude JSON response: ${textBlock.text.slice(0, 200)}`)
  }
}
