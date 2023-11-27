import { HTTPError } from 'ky'
import { ErrorFromServer } from '@/shared/types/utility-types.interface'


export async function validateServerError(error: unknown) {
	if (error instanceof HTTPError) {
		const response: ErrorFromServer = await error.response.clone().json()
		return response
	} else if (error instanceof Error) {
		return error.message
	} else {
		return 'Unhandled error'
	}
}
