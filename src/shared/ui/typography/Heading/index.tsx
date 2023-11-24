import { ReactNode } from 'react'
import s from './heading.module.scss'
import { ccn } from '@/shared/lib/utils/client/cсn'

interface HeadingProps {
	className?: string
	variant: 'h1' | 'h2' | 'h3' | 'h4'
	children: ReactNode
}

export const Heading = ({ className, variant, children }: HeadingProps) => {
	const El = variant

	return <El className={ccn(s.heading, s[variant], className)}>{children}</El>
}
