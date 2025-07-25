export interface Chat {
  title: string;
  messages: {
    _doc: {
      sender: "llm" | "user";
      content: string;
      journalId: any[];
      timestamp: string;
      _id: string;
    };
  }[];
}
