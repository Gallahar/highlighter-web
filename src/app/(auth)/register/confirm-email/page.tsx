import { ConfirmEmail } from '@/_pages/ConfirmEmail'

export default function EmailConfirmationPage({
	searchParams,
}: {
	searchParams: {
		token: string
	}
}) {
	return <ConfirmEmail token={searchParams.token} />
}
