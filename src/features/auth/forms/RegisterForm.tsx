'use client'
import { Input } from '@/shared/ui/fields/Input'
import s from './form.module.scss'
import { Button } from '@/shared/ui/buttons/Button'
import { useForm } from 'react-hook-form'
import { RegisterDto } from '@/shared/types/user.interface'
import { useRouter } from 'next/navigation'
import { registerUser } from './actions'
import { localStorageService } from '@/shared/lib/utils/client/localStorage'
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
		const { isError, fieldErrors } = await registerUser(dto)
		if (!isError) {
			localStorageService.setUserEmail(dto.email)
			router.push('register/check-email')
		} else {
			Object.entries(fieldErrors).forEach(([fieldName, fieldError]) => {
				setError(fieldName as any, { message: fieldError})
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
			<Button type='submit' variant='filled'>
				Create
			</Button>
		</form>
	)
}
