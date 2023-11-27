'use client'

import {
	Spinner,
	Heading,
	BaseText,
	PrimaryButton,
	CustomLink,
} from '@/shared/ui'
import { useSendAgain } from './useSendAgain'
import s from './check-email.module.scss'

export const CheckEmail = () => {
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
