export enum MessageRole {
  User = 'user',
  Assistant = 'assistant',
  System = 'system',
}

export interface Message {
  id: string
  text: string
  role: MessageRole
  createdAt: Date
}

export type ResponseChunk =
  | {
      type: 'start'
      id: string
      createdAt: Date
    }
  | {
      type: 'chunk'
      content: string
    }
  | {
      type: 'complete'
    }
