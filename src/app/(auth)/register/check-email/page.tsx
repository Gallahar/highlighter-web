'use client'

import s from './check-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'
import { BaseText } from '@/shared/ui/typography/BaseText'
import { Button } from '@/shared/ui/buttons/Button'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { redirect, useRouter } from 'next/navigation'
import { authApiClient } from '@/shared/api'
import { localStorageService } from '@/shared/lib/utils/client/localStorage'
import { useEffect, useState } from 'react'
import { HTTPError } from 'ky'
import { Spinner } from '@/shared/ui/loaders/Spinner'

export default function CheckEmail() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)
	const [userData, setUserData] = useState<{
		username: string
		email: string
	} | null>(null)

	const email = localStorageService.getUserEmail()
	if (!email) {
		redirect('/register')
	}

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await authApiClient
					.get(`preview/${email}`)
					.json<{ email: string; username: string }>()
				setUserData(data)
			} catch (error) {
				if (error instanceof HTTPError && error.response.status === 404) {
					router.push('/register')
				} else if (error instanceof HTTPError && error.name === 'ServerError') {
					setError(error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}
		fetchUser()

		return () => localStorageService.removeUserEmail()
	}, [])

	const handleSendAgain = async () => {
		try {
			await authApiClient.post('resend-confirmation-link', {
				json: { email: email },
			})
		} catch (error) {
			if (error instanceof HTTPError && error.name === 'ServerError') {
				alert(error.message)
			}
		}
	}

	return (
		<section className={s.pageWrapper}>
			{isLoading && <Spinner size='lg' />}
			{userData && (
				<>
					<Heading variant='h1'>{`Hi, ${userData.username}`}</Heading>
					<div className={s.messageWrapper}>
						<BaseText>
							We sent a confirmation letter to{' '}
							<span className={s.accent}>{userData.email}</span>. Please follow
							the steps in this letter to confirm your account.
						</BaseText>
						<Button onClick={handleSendAgain} variant='default'>
							Send again
						</Button>
						<BaseText className={s.link}>
							Wrong E-mail?
							<CustomLink isAccent href={'/'}>
								Change here
							</CustomLink>
						</BaseText>
					</div>
				</>
			)}
			{error && (
				<>
					<Heading variant='h1'>Something went wrong...</Heading>
					<BaseText>{error}</BaseText>
					<CustomLink className={s.linkToHomePage} href={'/'}>
						Return to Home Page
					</CustomLink>
				</>
			)}
		</section>
	)
}
