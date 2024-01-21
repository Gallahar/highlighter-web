'use client'

import { ComponentPropsWithoutRef, useState } from 'react'
import s from './accordion.module.scss'
import ControlIcon from '@/assets/svg/arrow-down_icon.svg'
import { Heading } from '..'
interface AccordionProps extends ComponentPropsWithoutRef<'div'> {
	rowMinHeight?: number
	rowMaxHeight?: number
	colMinWidth?: number
	colMaxWidth?: number
	title?: string
}

export const Accordion = ({
	title,
	colMinWidth = 100,
	colMaxWidth = 120,
	children,
}: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={s.accordionWrapper}>
			<header className={s.accordionHeader}>
				<Heading variant='h2'>{title}</Heading>
				<button onClick={() => setIsOpen((isOpen) => !isOpen)}>
					<ControlIcon className={s.control} data-open={isOpen} />
				</button>
			</header>
			<div
				data-open={isOpen}
				style={{
					gridTemplateColumns: `repeat(auto-fill,minmax(${colMinWidth}px,${colMaxWidth}px))`,
				}}
				className={s.accordionBody}
			>
				{children}
			</div>
		</div>
	)
}
