import { authApiClient } from '@/shared/api'
import { localStorageService } from '@/shared/lib/utils/client/localStorage'
import { validateServerError } from '@/shared/lib/utils/validateServerError'
import { HTTPError } from 'ky'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useSendAgain = () => {
	const [wasSended, setWasSended] = useState(false)
	const [time, setTime] = useState(0)
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

	const timerHandler = () => {
		setTime(60)
		const intervalId = setInterval(() => {
			setTime((time) => time - 1)
		}, 1000)
		setTimeout(() => {
			clearInterval(intervalId)
			setWasSended(false)
		}, 60 * 1000)
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
			setWasSended(true)
			timerHandler()
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
			? ` in ${time === 60 ? '1' : 0}:${
					time === 60 ? '00' : time < 10 ? '0' + time : time
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
