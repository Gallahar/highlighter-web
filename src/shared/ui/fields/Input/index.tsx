import { ComponentPropsWithoutRef, forwardRef } from 'react'
import s from './input.module.scss'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	error?: string
	label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, id, error, label, ...rest }, ref) => {
		return (
			<div className={s.inputWrapper}>
				{label && <label htmlFor={id}>{label}</label>}
				<input ref={ref} id={id} className={s.input} {...rest} />
				{error && <p className={s.error}>{error}</p>}
			</div>
		)
	}
)

Input.displayName = 'Input'
