'use server'

import { authApi } from '@/shared/api'
import { RegisterDto } from '@/shared/types/user.interface'
import { REGISTER_USER_RESPONSES } from '../../config/auth-responses'
import { validateServerError } from '@/shared/lib/utils/validate-server-error'

interface ResponseErrors {
	isError: boolean
	message?: string
	fieldErrors: {
		username: string
		email: string
	}
}

export async function registerUser(dto: RegisterDto) {
	try {
		await authApi
			.post('register', {
				json: dto,
			})
			.json()

		return {
			isError: false,
			message: 'User was created!',
			fieldErrors: { username: '', email: '' },
		}
	} catch (error) {
		const validatedErrors = await validateServerError(error)
		const responseErrors: ResponseErrors = {
			isError: true,
			fieldErrors: { username: '', email: '' },
		}
		if (typeof validatedErrors === 'string') {
			responseErrors.message = validatedErrors
			return responseErrors
		}

		if (
			validatedErrors.message.includes(
				REGISTER_USER_RESPONSES.EMAIL_IS_ALREADY_USED
			)
		) {
			responseErrors.fieldErrors.email = 'Email is already used.'
		}

		if (
			validatedErrors.message.includes(
				REGISTER_USER_RESPONSES.USERNAME_IS_ALREADY_USED
			)
		) {
			responseErrors.fieldErrors.username = 'Username is already used.'
		}

		return responseErrors
	}
}
