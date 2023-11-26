import { ccn } from '@/shared/lib/utils/client/cсn'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import s from './container.module.scss'

const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, children, ...rest }, ref) => {
		return (
			<div className={ccn(s.container, className)} ref={ref} {...rest}>
				{children}
			</div>
		)
	}
)

Container.displayName = 'container'

export default Container
