export interface ChatHistory {
  today?: ShowingChat[];
  yesterday?: ShowingChat[];
  thisMonth?: ShowingChat[];
  other?: ShowingChat[];
}

export interface ShowingChat {
  name: string;
  time: number;
  id: string;
}

export interface ApiChatHistoryItem {
  title: string;
  _id: string;
  createdAt: number;
  updatedAt: number;
}
