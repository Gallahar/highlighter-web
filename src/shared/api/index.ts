import ky from 'ky'
import { logger } from '../lib/utils/logger'
import { ErrorFromServer } from '../types/utility-types.interface'

const baseApi = ky.create({
	// credentials: 'include',
	hooks: {
		beforeError: [
			async (error) => {
				const { response } = error
				const cloneBody = response.clone()
				const result: ErrorFromServer = await cloneBody.json()
				if (result && error.message) {
					const { message: data } = result
					let messages
					let consoleMessages
					if (Array.isArray(data)) {
						consoleMessages = data.join('\n')
						messages = data.join(' ')
					} else {
						consoleMessages = data
						messages = data
					}
					logger.error(
						`${error.message}\nError messages from server:\n${messages}`
					)
					error.name = 'ServerError'
					error.message = messages
				}
				return error
			},
		],
	},
})

const authApi = baseApi.extend({
	prefixUrl: process.env.AUTH_API_URL,
})
const authApiClient = baseApi.extend({
	prefixUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
})

const highLightApi = baseApi.extend({
	prefixUrl: process.env.HIGHLIGHT_API_URL,
})

const gameApi = baseApi.extend({ prefixUrl: process.env.GAME_API_URL })

const categoryApi = baseApi.extend({ prefixUrl: process.env.CATEGORY_API_URL })

const fileApi = baseApi.extend({ prefixUrl: process.env.FILE_API_URL })

export {
	baseApi,
	authApi,
	authApiClient,
	highLightApi,
	gameApi,
	categoryApi,
	fileApi,
}
