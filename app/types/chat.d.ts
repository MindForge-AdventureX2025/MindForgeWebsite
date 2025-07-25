export interface Chat {
  title: string
  messages: {
    _doc: ChatInfo
  }[]
}

export interface ChatInfo {
  sender: 'llm' | 'user'
  content: string
  journalId: any[]
  timestamp: string | Date | number
  _id: string
}

export interface UpdateResponse {
  response: string
  originalChat: { messages: ChatInfo[] }
}
