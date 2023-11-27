'use client'

import { authApi } from '@/shared/api'
import { localStorageService, validateServerError } from '@/shared/lib'
import { Spinner, Heading, BaseText, CustomLink } from '@/shared/ui'
import { useState, useEffect } from 'react'
import { AuthMessage, UserRedirect } from '@/features/auth'
import s from './confirm-email.module.scss'

export const ConfirmEmail = ({ token }: { token: string }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [redirectBehavior, setRedirectBehavior] = useState<
		'confirmed' | 'already confirmed' | string
	>('')

	useEffect(() => {
		async function confirmEmail() {
			try {
				const response = await authApi.post('confirm-email', {
					json: { token: token },
				})
				console.log(response)
				setTitle('Thanks for joining Highlighter!')
				setText('Your account was successfully activated')
				setRedirectBehavior('confirmed')
				localStorageService.removeUserEmail()
			} catch (error) {
				setTitle('Something went wrong!')
				const errors = await validateServerError(error)
				if (typeof errors === 'string') {
					setText(errors)
				} else {
					setText(
						Array.isArray(errors.message)
							? errors.message.join('\n')
							: errors.message
					)

					if (errors.message.includes('Email already confirmed')) {
						setRedirectBehavior('already confirmed')
					}
				}
			} finally {
				setIsLoading(false)
			}
		}
		confirmEmail()
	}, [token])

	return (
		<section className={s.pageWrapper}>
			{isLoading ? (
				<Spinner size='lg' />
			) : (
				<>
					<AuthMessage title={title} text={text} />
					<UserRedirect redirectBehavior={redirectBehavior} />
				</>
			)}
		</section>
	)
}
