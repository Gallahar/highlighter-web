'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { baseApi } from '@/shared/api'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { RegisterDto } from '@/shared/types/user.interface'
import { emailRegexp } from '@/shared/config/constants'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterDto>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	const router = useRouter()

	const submitHandler = handleSubmit(async (dto) => {
		try {
			const response = await baseApi
				.post('api/auth/register', {
					json: dto,
				})
				.json<{ email: string; username: string }>()

			console.log(response)
			router.push(
				`register/check-email?email=${response.email}&username=${response.username}`
			)
		} catch (error) {
			console.log(error)
		}
	})

	return (
		<form onSubmit={submitHandler} className={s.form}>
			<Input
				label='e-mail'
				type='email'
				error={errors.email?.message}
				{...register('email', {
					required: 'email is required',
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
					required: 'name is required',
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
					required: 'password is required',
					minLength: {
						value: 8,
						message: 'password should be at least 8th length',
					},
				})}
			/>
			<Button type='submit' variant='filled'>
				Create
			</Button>
		</form>
	)
}
