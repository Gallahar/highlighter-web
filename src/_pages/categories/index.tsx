import { Category } from '@/shared/types'
import s from './categories.module.scss'
import { CategoryCard } from '@/features/categories/components/category-card'

export const Categories = ({ categories }: { categories: Category[] }) => {
	return (
		<section className={s.pageWrapper}>
			{categories.map(({ _id, ...rest }) => (
				<CategoryCard key={_id} {...rest} />
			))}
		</section>
	)
}
