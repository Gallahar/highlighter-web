import { ComponentPropsWithoutRef } from 'react'
import s from './base-text.module.scss'
import { ccn } from '@/shared/lib'

interface BaseTextProps extends ComponentPropsWithoutRef<'p'> {
	isItalic?: boolean
	variant?: 'primary' | 'secondary'
}

export const BaseText = ({
	className,
	children,
	isItalic = false,
	variant = 'secondary',
}: BaseTextProps) => {
	return (
		<p
			className={ccn(
				s.baseText,
				s[variant],
				{ [s.italic]: isItalic },
				className
			)}
		>
			{children}
		</p>
	)
}
