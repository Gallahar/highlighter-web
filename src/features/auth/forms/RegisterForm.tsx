'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { RegisterDto } from '@/shared/types/user.interface'
import { emailRegexp } from '@/shared/config/constants'
import { useRouter } from 'next/navigation'
import { registerUser } from './actions'
import { localStorageService } from '@/shared/lib/utils/localStorage'

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
				label='e-mail'
				type='email'
				error={errors.email?.message}
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: emailRegexp,
						message: 'Incorrect format of email',
					},
				})}
			/>
			<Input
				label='username'
				type='text'
				error={errors.username?.message}
				{...register('username', {
					required: 'Name is required',
					minLength: {
						value: 4,
						message: 'Name should be at least 4th length ',
					},
				})}
			/>
			<Input
				label='password'
				type='password'
				error={errors.password?.message}
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 8,
						message: 'Password should be at least 8th length',
					},
				})}
			/>
			<Button type='submit' variant='filled'>
				Create
			</Button>
		</form>
	)
}
