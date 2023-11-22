'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { RegisterDto } from '@/shared/types/user.interface'
import { useRouter } from 'next/navigation'
import { registerUser } from './actions'
import { localStorageService } from '@/shared/lib/utils/localStorage'
import {
	emailFields,
	emailValidation,
	passwordFields,
	passwordValidation,
	usernameFields,
	usernameValidation,
} from './constants'

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
		const { error, message } = await registerUser(dto)
		if (!error) {
			localStorageService.setUserEmail(dto.email)
			router.push('register/check-email')
		} else {
			if (message.includes('Email is already used.')) {
				setError('email', {
					message: Array.isArray(message)
						? message.find((e) => e === 'Email is already used.')
						: message,
				})
			} else if (message.includes('Username is already used.')) {
				setError('username', {
					message: Array.isArray(message)
						? message.find((e) => e === 'Username is already used.')
						: message,
				})
			}
		}

		//toaster here, and redirect only if error is false, remove else statement.
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
			<Button type='submit' variant='filled'>
				Create
			</Button>
		</form>
	)
}
