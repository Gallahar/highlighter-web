import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

export interface Game {
	_id: string
	title: string
	description: string
	icon: Icon
}
