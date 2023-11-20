'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { LoginDto } from '@/shared/types/user.interface'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { emailRegexp } from '@/shared/config/constants'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDto>({ mode: 'onChange', reValidateMode: 'onBlur' })

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const onSubmit = async (dto: LoginDto) => {
		await signIn('credentials', { ...dto, redirect: false, callbackUrl })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				error={errors.email?.message}
				label='e-mail'
				type='email'
				{...register('email', {
					required: 'email is required',
					pattern: { value: emailRegexp, message: 'Wrong format email' },
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
						message: 'password must be at least 8 length',
					},
				})}
			/>
			<Button type='submit' variant='filled'>
				Log in
			</Button>
		</form>
	)
}
