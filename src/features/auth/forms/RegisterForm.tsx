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
		formState: { errors, isLoading },
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
			alert(message)
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
				{isLoading ? 'Processing' : 'Create'}
			</Button>
		</form>
	)
}
