import type { RenderingItem } from './sidebarRendering'

export interface History {
  today: RenderingItem[]
  yesterday: RenderingItem[]
  thisMonth: RenderingItem[]
  other: RenderingItem[]
}

export interface ApiChatHistoryItem {
  title: string
  _id: string
  createdAt: number
  updatedAt: number
  nonTitleUpdatedAt: number
}
