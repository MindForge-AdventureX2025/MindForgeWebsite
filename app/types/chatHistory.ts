export interface ChatHistory {
  today?: ShowingChat[];
  yesterday?: ShowingChat[];
  lastWeek?: ShowingChat[];
  other?: ShowingChat[];
}

export interface ShowingChat {
  name: string;
  time: number;
  id: string;
}
