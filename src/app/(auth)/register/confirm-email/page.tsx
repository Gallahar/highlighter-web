'use client'
import s from './confirm-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { BaseText } from '@/shared/ui/typography/BaseText'
import { ClientRedirect } from './clientRedirect'
import { useEffect, useState } from 'react'
import { validateServerError } from '@/shared/lib/utils/validateServerError'
import { authApiClient } from '@/shared/api'
import { Spinner } from '@/shared/ui/loaders/Spinner'
import { localStorageService } from '@/shared/lib/utils/client/localStorage'

export default function EmailConfirmation({
	searchParams,
}: {
	searchParams: {
		token: string
	}
}) {
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [redirectBehavior, setRedirectBehavior] = useState<
		'confirmed' | 'already confirmed' | string
	>('')

	useEffect(() => {
		async function confirmEmail() {
			try {
				const response = await authApiClient.post('confirm-email', {
					json: searchParams,
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
	}, [])

	return (
		<section className={s.pageWrapper}>
			{isLoading ? (
				<Spinner size='md' />
			) : (
				<>
					<Heading variant='h1'>{title}</Heading>
					{text && <BaseText>{text}</BaseText>}
					<CustomLink isAccent href={'/'}>
						Return to Homepage
					</CustomLink>
					<ClientRedirect redirectBehavior={redirectBehavior} />
				</>
			)}
		</section>
	)
}
