import { ccn } from '@/shared/lib/utils/client/cсn'
import { ComponentPropsWithoutRef } from 'react'
import s from './button.module.scss'

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
