import { ComponentPropsWithoutRef } from 'react'
import s from './spinner.module.scss'
import SpinnerSvg from '@/assets/svg/spinner.svg'
import { ccn } from '@/shared/lib/utils'

interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Spinner = ({ className, size = 'sm', ...rest }: SpinnerProps) => {
	return (
		<span className={ccn(s.rotateWrapper, s[size], className)} {...rest}>
			<SpinnerSvg className={s.spinner} />
		</span>
	)
}
