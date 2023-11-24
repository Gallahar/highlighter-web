import ky from 'ky'
import { logger } from '../lib/utils/logger'
import { ErrorFromServer } from '../types/utility-types.interface'
import { cookiesService } from '../lib/utils/cookiesService'

const baseApi = ky.create({
	headers: {
		'Access-Control-Allow-Origin':
			process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
	},
	credentials: 'include',
	hooks: {
		beforeError: [
			async (error) => {
				const { response } = error
				const cloneBody = response.clone()
				const result: ErrorFromServer = await cloneBody.json()
				if (result && result.message) {
					const { message: data } = result
					let consoleMessages
					if (Array.isArray(data)) {
						consoleMessages = data.join('\n')
					} else {
						consoleMessages = data
					}
					logger.error(
						`${error.response.statusText}\nError messages from server:\n${consoleMessages}`
					)
				}
				return error
			},
		],
		afterResponse: [
			(_request, _options, response) => {
				const token = response.headers.get('Bearer')
				if (token) {
					cookiesService.setAuthToken(token)
				}
			},
		],
		beforeRequest: [
			({ headers }) => {
				const token = cookiesService.getAuthToken()
				if (token && headers) {
					headers.set('Authorization',`Bearer ${token}`)
				}
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
//Todo: replace multiple constants with NEXT_PUBLIC_API || API like with baseInstance. 