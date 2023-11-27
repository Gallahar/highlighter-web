'use client'

import s from './check-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'
import { BaseText } from '@/shared/ui/typography/BaseText'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { Spinner } from '@/shared/ui/loaders/Spinner'
import { useSendAgain } from './useSendAgain'
import { PrimaryButton } from '@/shared/ui'

export default function CheckEmail() {
	const {
		error,
		isLoading,
		userData,
		wasSended,
		handleSendAgain,
		buttonString,
	} = useSendAgain()

	return (
		<section className={s.pageWrapper}>
			{isLoading && <Spinner size='lg' />}
			{userData && (
				<>
					<Heading variant='h1'>{`Hi, ${userData.username}`}</Heading>
					<div className={s.messageWrapper}>
						<BaseText>
							We sent a confirmation letter to{' '}
							<span className={s.accent}>{userData.email}</span>. Please follow
							the steps in this letter to confirm your account.
						</BaseText>
						<PrimaryButton
							onClick={handleSendAgain}
							variant={wasSended ? 'default' : 'filled'}
							disabled={wasSended}
						>
							{buttonString}
						</PrimaryButton>
						<BaseText className={s.link}>
							Wrong E-mail?
							<CustomLink isAccent href={'/'}>
								Change here
							</CustomLink>
						</BaseText>
					</div>
				</>
			)}
			{error && (
				<>
					<Heading variant='h1'>Something went wrong...</Heading>
					<BaseText>{error}</BaseText>
					<CustomLink className={s.linkToHomePage} href={'/'}>
						Return to Home Page
					</CustomLink>
				</>
			)}
		</section>
	)
}
