import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import { Game } from './game.interface'

export interface Categories {
	_id: string
	title: string
	description: string
	games: Game[]
	icon: Icon
}
