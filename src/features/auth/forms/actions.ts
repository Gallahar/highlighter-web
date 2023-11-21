'use server'

import { authApi } from '@/shared/api'
import { validateServerError } from '@/shared/lib/utils/validateServerError'
import { RegisterDto } from '@/shared/types/user.interface'

export async function registerUser(dto: RegisterDto) {
	try {
		const response = await authApi
			.post('register', {
				json: dto,
			})
			.json<{ email: string; username: string }>()

		return response
	} catch (error) {
		await new Promise((res) => setTimeout(() => res('dsds'), 5000))
		return validateServerError(error)
	}
}
