'use client'
import Image from 'next/image'
import avatarFallback from '@/assets/img/avatar_fallback.webp'

import s from './user-bar.module.scss'
import { useSession } from 'next-auth/react'
import { BaseText } from '@/shared/ui'

export const UserBar = () => {
	const { status, data } = useSession()

	console.log(data?.user)
	if (status !== 'authenticated') {
		return null
	}

    
	if (!data.user) {
		return null
	}

	return (
		<div className={s.avatarContainer}>
			<Image
				className={s.avatar}
				alt='userAvatar'
				src={data.user.avatar !== '' ? data.user.avatar : avatarFallback}
			/>
			<BaseText variant='primary'>{data.user.username}</BaseText>
		</div>
	)
}
