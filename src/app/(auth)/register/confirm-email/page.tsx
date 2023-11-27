import { ConfirmEmail } from '@/_pages/confirm-email'

export default function EmailConfirmationPage({
	searchParams,
}: {
	searchParams: {
		token: string
	}
}) {
	return <ConfirmEmail token={searchParams.token} />
}
