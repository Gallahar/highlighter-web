import { categoryApi } from '@/shared/api'
import { Category } from '@/shared/types'

export const categoriesService = {
	getAll: async () => await categoryApi.get('categories').json<Category[]>(),
}
