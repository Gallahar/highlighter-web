import { User } from './user.interface'

export interface Chat {
	_id: string
	users: User[]
	messages: Message[]
}

export interface Message {
	_id: string
	chatId: string
	by: User
	text: string
	likedBy: User[]
	attachedFiles: string[]
	isEdited?: boolean
}
