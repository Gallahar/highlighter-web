import { ComponentPropsWithoutRef } from 'react'
import s from './custom-link.module.scss'
import Link from 'next/link'
import { ccn } from '@/shared/lib/utils/client/cсn'

interface CustomLinkProps extends ComponentPropsWithoutRef<typeof Link> {
	isAccent?: boolean
}

export const CustomLink = ({
	className,
	isAccent = false,
	children,
	...rest
}: CustomLinkProps) => {
	return (
		<Link
			{...rest}
			className={ccn(s.customLink, { [s.accent]: isAccent }, className)}
		>
			{children}
		</Link>
	)
}
