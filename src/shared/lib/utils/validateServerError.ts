import { HTTPError } from 'ky'

export function validateServerError(error: unknown) {
	if (error instanceof HTTPError && error.name === 'ServerError') {
		const messages = error.message.split('#')
		return messages.length > 1 ? messages : error.message
	} else {
		return 'Something went wrong'
	}
}
