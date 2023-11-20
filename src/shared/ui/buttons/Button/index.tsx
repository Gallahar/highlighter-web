import { ccn } from '@/shared/lib/utils/cсn'
import { ComponentPropsWithoutRef } from 'react'
import s from './button.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant?: 'default' | 'filled'
}

export const Button = ({
	className,
	variant = 'default',
	children,
	...rest
}: ButtonProps) => {
	return (
		<button className={ccn(s.button, s[variant], className)} {...rest}>
			{children}
		</button>
	)
}
