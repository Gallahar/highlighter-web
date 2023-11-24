'use server'

import { authApi } from '@/shared/api'
import { validateServerError } from '@/shared/lib/utils/validateServerError'
import { RegisterDto } from '@/shared/types/user.interface'

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
		if(typeof validatedErrors==='string'){
			responseErrors.message = validatedErrors
			return responseErrors
		}

		if (validatedErrors.message.includes('Email is already used.')) {
			responseErrors.fieldErrors.email = 'Email is already used.'
		}

		if (validatedErrors.message.includes('Username is already used.')) {
			responseErrors.fieldErrors.username = 'Username is already used.'
		}

		return responseErrors
	}
}
