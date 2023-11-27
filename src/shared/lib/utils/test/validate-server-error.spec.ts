import { HTTPError } from 'ky'
import { validateServerError } from '../validate-server-error'

const testUrl = 'http://test'

describe('util: validateServerError()', () => {
	it('should return "Request failed with status code 200" from ky HTTPError instance', async () => {
		const error = await validateServerError(
			new HTTPError(new Response(null), new Request(testUrl), {
				credentials: 'include',
				method: 'GET',
				onDownloadProgress: () => {},
				prefixUrl: testUrl,
				retry: {},
			})
		)
		expect(error).toEqual('Request failed with status code 200')
	})

	it('should return "Test error" from node Error instance', async () => {
		const error = await validateServerError(new Error('Test error'))
		expect(error).toEqual('Test error')
	})

	it('should return "Unhandled error" with empty object', async () => {
		expect(await validateServerError({})).toEqual('Unhandled error')
	})

	it('should return "Unhandled error" with undefined', async () => {
		expect(await validateServerError(undefined)).toEqual('Unhandled error')
	})
})
