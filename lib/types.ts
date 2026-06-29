export interface QuestionnaireData {
  recipientName: string
  occasion: string
  occasionDetails: string
  memories: string
  artistStyle: string
  customerEmail: string
  versions: 1
  priceId: string
}

export interface Order {
  id: string
  questionnaireData: QuestionnaireData
  status: 'pending' | 'generating' | 'complete' | 'failed'
  songUrls: string[]
  songPageId: string
  createdAt: number
  paidAt?: number
}

export interface SongPage {
  id: string
  orderId: string
  recipientName: string
  occasion: string
  artistStyle: string
  songUrls: string[]
  createdAt: number
}

export interface PendingOrder {
  questionnaireData: QuestionnaireData
  createdAt: number
}
