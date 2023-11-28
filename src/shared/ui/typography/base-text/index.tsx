import { ComponentPropsWithoutRef } from 'react'
import s from './base-text.module.scss'
import { ccn } from '@/shared/lib'

interface BaseTextProps extends ComponentPropsWithoutRef<'p'> {
	isItalic?: boolean
}

export const BaseText = ({
	className,
	children,
	isItalic = false,
}: BaseTextProps) => {
	return (
		<p className={ccn(s.baseText, { [s.italic]: isItalic }, className)}>
			{children}
		</p>
	)
}
