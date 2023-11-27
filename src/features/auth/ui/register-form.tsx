'use client'

import s from './form.module.scss'
import { useForm } from 'react-hook-form'
import { RegisterDto } from '@/shared/types'
import { useRouter } from 'next/navigation'
import { registerUser } from '../api/server/register-user'
import { localStorageService } from '@/shared/lib'
import {
	emailFields,
	emailValidation,
	passwordFields,
	passwordValidation,
	usernameFields,
	usernameValidation,
} from '../config/auth-form-fields'
import { PrimaryButton, Input } from '@/shared/ui'

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterDto>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	const router = useRouter()

	const submitHandler = handleSubmit(async (dto) => {
		const { isError, fieldErrors } = await registerUser(dto)
		if (!isError) {
			localStorageService.setUserEmail(dto.email)
			router.push('register/check-email')
		} else {
			Object.entries(fieldErrors).forEach(([fieldName, fieldError]) => {
				setError(fieldName as any, { message: fieldError })
			})
		}

		// toaster here, and redirect only if error is false, remove else statement.
	})

	return (
		<form onSubmit={submitHandler} className={s.form}>
			<Input
				{...emailFields}
				error={errors.email?.message}
				{...register('email', emailValidation)}
			/>
			<Input
				{...usernameFields}
				error={errors.username?.message}
				{...register('username', usernameValidation)}
			/>
			<Input
				{...passwordFields}
				error={errors.password?.message}
				{...register('password', passwordValidation)}
			/>
			<PrimaryButton type='submit' variant='filled'>
				Create
			</PrimaryButton>
		</form>
	)
}
