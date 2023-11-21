'use client'

import { useSearchParams } from 'next/navigation'
import s from './check-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'
import { BaseText } from '@/shared/ui/typography/BaseText'
import { Button } from '@/shared/ui/buttons/Button'
import { CustomLink } from '@/shared/ui/links/CustomLink'

export default function CheckEmail() {
	const params = useSearchParams()

	return (
		<section className={s.pageWrapper}>
			<>
				<Heading variant='h1'>{`Hi, ${params.get('username')}`}</Heading>
				<div className={s.messageWrapper}>
					<BaseText>
						We sent a confirmation letter to{' '}
						<span className={s.accent}>{params.get('email')}</span>. Please
						follow the steps in this letter to confirm your account.
					</BaseText>
					<Button variant='default'>Send again</Button>
					<BaseText className={s.link}>
						Wrong E-mail?
						<CustomLink isAccent href={'/'}>
							Change here
						</CustomLink>
					</BaseText>
				</div>
			</>
		</section>
	)
}
