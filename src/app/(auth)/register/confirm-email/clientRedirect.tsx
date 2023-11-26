'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ClientRedirect = ({
	redirectBehavior,
}: {
	redirectBehavior: 'confirmed' | 'already confirmed' | string
}) => {
	const router = useRouter()

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (redirectBehavior === 'already confirmed') {
				router.push('/login')
			}
			if (redirectBehavior === 'confirmed') {
				signIn('confirmed-email', { callbackUrl: '/' })
			}
		}, 3000)

		return () => clearTimeout(timeoutId)
	}, [redirectBehavior])

	return null
}
