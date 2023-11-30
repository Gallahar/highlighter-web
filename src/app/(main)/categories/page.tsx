import { Categories } from '@/_pages/categories'
import { categoriesService } from '@/features/categories/api/server/categories-service'

import { notFound } from 'next/navigation'

export const revalidate = 3600 * 24

export default async function CategoriesPage() {
	try {
		const categories = await categoriesService.getAll()		

		return <Categories categories={categories} />
	} catch (error) {
		return notFound()
	}
}
