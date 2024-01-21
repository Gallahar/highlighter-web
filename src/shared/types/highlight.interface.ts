import { Category } from './categories.interface'
import { Game } from './game.interface'
import { Comment, User } from './user.interface'

export interface Highlight {
	_id: string
	title: string
	content: string[]
	likes: number
	by: User
	categories: Category[]
	game: Game
	comments: Comment[]
}
