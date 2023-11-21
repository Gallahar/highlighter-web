import { Chat } from './chat.interface'
import { Highlight } from './highlight.interface'
import { Notification } from './notification.interface'

export interface User {
	_id: string
	email: string
	username: string
	avatar: string
	highLight: Highlight
	subscribed: User[]
	subscribers: User[]
	friends: User[]
	friendsRequest: User[]
	notifications: Notification[]
	comments: Comment[]
	chats: Chat[]
}
export interface RegisterDto {
	email: string
	username: string
	password: string
}

export type LoginDto = Omit<RegisterDto, 'username'>

export interface Comment {
	_id: string
	by: User
	to: Highlight | Comment
	toId: string
	text: string
	likedBy: User[]
	replies: Comment[]
}
