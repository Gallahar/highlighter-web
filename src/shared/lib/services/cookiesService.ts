import cookies from 'js-cookie'

export const cookiesService = {
	getAuthToken() {
		return cookies.get('Bearer')
	},

	setAuthToken(token: string) {
		cookies.set('Bearer', token)
	},
}
