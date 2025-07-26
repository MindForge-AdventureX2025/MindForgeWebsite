interface Journal {
  _id: string
  title: string
  content: string
  userId: string
  tags: any[]
  audioIds: any[]
  nonTitleUpdatedAt: Date | number | string
  createdAt: Date | number | string
  updatedAt: Date | number | string
  __v: 0
}

interface ShowingJournal {
  title: string
  content: string
}
