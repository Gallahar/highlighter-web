import { GamePreviewCard } from '@/entities/game'
import { Category } from '@/shared/types'
import { Accordion } from '@/shared/ui/accordion'

export const CategoryCard = ({ title, games }: Omit<Category, '_id'>) => {
	return (
		<Accordion title={title}>
			{[
				...games,
				...games,
				...games,
				...games,
				...games,
				...games,
				...games,
			].map(({ _id, ...rest }) => (
				<GamePreviewCard key={_id} {...rest} />
			))}
		</Accordion>
	)
}
