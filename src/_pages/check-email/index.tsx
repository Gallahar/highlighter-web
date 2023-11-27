'use client'

import { Spinner, Heading, BaseText, PrimaryButton } from '@/shared/ui'
import { AuthMessage, useSendAgain } from '@/features/auth'
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
					</div>
				</>
			)}
			{error && (
				<AuthMessage
					title={userData ? 'Something wen wrong' : ''}
					text={error}
				/>
			)}
		</section>
	)
}

// РАЗБИТЬ ю ПЕРЕИСПОЛЬЗОВАТЬ / создать сущность

// убрать изменение эмейла.
