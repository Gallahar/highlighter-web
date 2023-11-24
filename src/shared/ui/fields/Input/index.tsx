import { ComponentPropsWithoutRef, forwardRef } from 'react'
import s from './input.module.scss'
import { ccn } from '@/shared/lib/utils/client/cсn'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	error?: string
	label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, id, error, label, ...rest }, ref) => {
		return (
			<div className={ccn(s.inputWrapper, className)}>
				{label && <label htmlFor={id}>{label}</label>}
				<input ref={ref} id={id} className={s.input} {...rest} />
				{error && (
					<p role='alert' className={s.error}>
						{error}
					</p>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'
