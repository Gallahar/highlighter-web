import { authApi } from '@/shared/api'
import s from './confirm-email.module.scss'
import { Heading } from '@/shared/ui/typography/Heading'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { validateServerError } from '@/shared/lib/utils/validateServerError'
import { BaseText } from '@/shared/ui/typography/BaseText'

export default async function EmailConfirmation({
	searchParams,
}: {
	searchParams: {
		token: string
	}
}) {
	let message
	let text
	try {
		await authApi.post('confirm-email', {
			json: searchParams,
			cache: 'no-store',
		})
		message = 'Thanks for joining Highlighter!'
		text = 'Your account was successfully activated'
	} catch (error) {
		message = 'Something went wrong!'
		const errors = validateServerError(error)
		text = Array.isArray(errors) ? errors.join('\n') : errors
	}

	return (
		<section className={s.pageWrapper}>
			<Heading variant='h1'>{message}</Heading>
			{text && <BaseText>{text}</BaseText>}
			<CustomLink isAccent href={'/'}>
				Return to Homepage
			</CustomLink>
		</section>
	)
}
