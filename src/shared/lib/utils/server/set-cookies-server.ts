'use server'

import { parse } from 'cookie'
import { cookies } from 'next/headers'

export const setCookiesFromServer = (token: string[]) => {
	if (token && token.length > 0) {
		token.forEach((cookie) => {
			const parsedCookie = parse(cookie)
			const [cookieName, cookieValue] = Object.entries(parsedCookie)[0]
			const httpOnly = cookie.includes('HttpOnly')

			cookies().set({
				name: cookieName,
				value: cookieValue,
				httpOnly: httpOnly,
				path: parsedCookie.path,
				expires: new Date(parsedCookie['Expires']),
				secure: true,
			})
		})
	}
}
