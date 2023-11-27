import { authApi } from '@/shared/api'
import {
	localStorageService,
	useCountdown,
	validateServerError,
} from '@/shared/lib'
import { HTTPError } from 'ky'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSendAgain = () => {
	const [wasSended, setWasSended] = useState(false)
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)
	const [userData, setUserData] = useState<{
		username: string
		email: string
	} | null>(null)

	const { currentTime, trigger } = useCountdown(60, () => setWasSended(false))

	useEffect(() => {
		const email = localStorageService.getUserEmail()
		if (!email) {
			router.push('/register')
		}

		const fetchUser = async () => {
			try {
				const data = await authApi
					.get(`preview/${email}`)
					.json<{ email: string; username: string }>()
				setUserData(data)
			} catch (e) {
				if (e instanceof HTTPError && e.response.status === 404) {
					router.push('/register')
				} else if (e instanceof HTTPError) {
					const errors = await validateServerError(e)
					if (typeof errors === 'string') {
						setError(errors)
					} else {
						setError(
							Array.isArray(errors.message)
								? errors.message.join('\n')
								: errors.message
						)
					}
				}
			} finally {
				setIsLoading(false)
			}
		}
		fetchUser()
	}, [])

	const handleSendAgain = async () => {
		try {
			await authApi.post('resend-confirmation-link', {
				json: { email: userData?.email },
			})
			setWasSended(true)
			trigger()
		} catch (e) {
			if (e instanceof HTTPError) {
				const errors = await validateServerError(e)
				if (typeof errors === 'string') {
					setError(errors)
				} else {
					setError(
						Array.isArray(errors.message)
							? errors.message.join('\n')
							: errors.message
					)
				}
			}
		}
	}

	const buttonString = `send again${
		wasSended
			? ` in ${currentTime === 60 ? '1' : 0}:${
					currentTime === 60
						? '00'
						: currentTime < 10
						? '0' + currentTime
						: currentTime
			  }`
			: ''
	}`

	return {
		error,
		userData,
		isLoading,
		wasSended,
		buttonString,
		handleSendAgain,
	}
}
