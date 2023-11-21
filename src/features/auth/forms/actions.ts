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

		return {
			error: false,
			message: 'User was created!',
		}
	} catch (error) {
		return { error: true, message: validateServerError(error) }
	}
}
