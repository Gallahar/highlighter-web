import { HTTPError } from 'ky'

export function validateServerError(error: unknown) {
	if (error instanceof HTTPError && error.name === 'ServerError') {
		return error.message
	} else {
		return 'Something went wrong'
	}
}
