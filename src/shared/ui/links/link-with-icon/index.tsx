import { ComponentPropsWithoutRef, ReactNode } from 'react'
import s from './link-with-icon.module.scss'
import { ccn } from '@/shared/lib'
import Link from 'next/link'

interface LinkWithIconProps extends ComponentPropsWithoutRef<typeof Link> {
	icon?: ReactNode
	notificationCount?: number
}

export const LinkWithIcon = ({
	className,
	children,
	icon,
	notificationCount,
	...rest
}: LinkWithIconProps) => {
	return (
		<Link className={ccn(s.linkWithIcon, className)} {...rest}>
			{icon}
			{children}
			<span>{notificationCount}</span>
		</Link>
	)
}
