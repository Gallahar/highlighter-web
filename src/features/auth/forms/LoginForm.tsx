'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { LoginDto } from '@/shared/types/user.interface'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import {
	emailFields,
	emailValidation,
	passwordFields,
	passwordValidation,
} from './constants'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDto>({ mode: 'onChange', reValidateMode: 'onBlur' })

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const onSubmit = async (dto: LoginDto) => {
		await signIn('sign-in', { ...dto, redirect: false, callbackUrl })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				error={errors.email?.message}
				{...emailFields}
				{...register('email', emailValidation)}
			/>
			<Input
				{...passwordFields}
				error={errors.password?.message}
				{...register('password', passwordValidation)}
			/>
			<Button type='submit' variant='filled'>
				Log in
			</Button>
		</form>
	)
}
