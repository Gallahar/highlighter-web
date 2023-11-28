'use client'
import LogoutIcon from '@/assets/svg/logout_icon.svg'
import s from './logout-button.module.scss'
import { useSession, signOut } from 'next-auth/react'
import { ccn } from '@/shared/lib'

export const LogoutButton = ({ className }: { className?: string }) => {
	const { status } = useSession()

	if (status !== 'authenticated') {
		return null
	}

	return (
		<button
			onClick={() => signOut()}
			className={ccn(s.logoutButton, className)}
		>
			<LogoutIcon />
			<span>Log out</span>
		</button>
	)
}
