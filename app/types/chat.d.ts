export interface Chat {
  title: string
  messages: {
    _doc: ChatInfo
  }[]
  _id: string

}

export interface ChatInfo {
  sender: 'llm' | 'user'
  content: string
  journalId?: string[]
  timestamp: string | Date | number
  _id?: string
}

export interface UpdateResponse {
  response: string
  originalChat: { messages: ChatInfo[] }
}
