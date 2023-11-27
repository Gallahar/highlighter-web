'use client'

import s from './form.module.scss'
import { useForm } from 'react-hook-form'
import type { LoginDto } from '@/shared/types/user.interface'
import { signIn } from 'next-auth/react'
import {
	emailFields,
	emailValidation,
	passwordFields,
	passwordValidation,
} from '../config/auth-form-fields'
import { PrimaryButton, Input } from '@/shared/ui'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDto>({ mode: 'onChange', reValidateMode: 'onBlur' })

	const onSubmit = async (dto: LoginDto) => {
		await signIn('sign-in', { ...dto, redirect: false, callbackUrl: '/' })
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
			<PrimaryButton type='submit' variant='filled'>
				Log in
			</PrimaryButton>
		</form>
	)
}
