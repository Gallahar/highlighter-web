import {  GamePreview } from './game.interface'

export interface Category {
	_id: string
	title: string
	slug: string
	games: GamePreview[]
}
