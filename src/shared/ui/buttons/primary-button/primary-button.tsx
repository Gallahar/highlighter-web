import { ccn } from '@/shared/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import s from './primary-button.module.scss'

interface PrimaryButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant?: 'default' | 'filled'
}

export const PrimaryButton = ({
	className,
	variant = 'default',
	children,
	...rest
}: PrimaryButtonProps) => {
	return (
		<button className={ccn(s.button, s[variant], className)} {...rest}>
			{children}
		</button>
	)
}
