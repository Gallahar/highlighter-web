

import s from './confirm-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'

export default function EmailConfirmation() {
	return (
		<section className={s.pageWrapper}>
			<Heading variant='h1'>HERE YOU WILL BE CONFIRM YOUR EMAIL</Heading>
		</section>
	)
}
