import ky from 'ky'
import { logger } from '../lib/utils/logger'

const baseApi = ky.create({
	credentials: 'include',
	hooks: {
		beforeError: [
			async (error) => {
				const result = await error.response.json()
				if (result && error.message) {
					const { message: data } = result
					let messages
					if (Array.isArray(data)) {
						messages = data.join('\n')
					} else {
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
	prefixUrl: process.env.USER_API_URL,
})

const highLightApi = baseApi.extend({
	prefixUrl: process.env.HIGHLIGHT_API_URL,
})

const gameApi = baseApi.extend({ prefixUrl: process.env.GAME_API_URL })

const categoryApi = baseApi.extend({ prefixUrl: process.env.CATEGORY_API_URL })

const fileApi = baseApi.extend({ prefixUrl: process.env.FILE_API_URL })

export { baseApi, authApi, highLightApi, gameApi, categoryApi, fileApi }
