import { authApi } from '@/shared/api'
import { parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

type NextAuthOptionsCallback = (
	req: NextApiRequest,
	res: NextApiResponse
) => NextAuthOptions

export const authOptions: NextAuthOptionsCallback = (req, res) => {
	return {
		pages: {
			signIn: '/login',
		},
		session: {
			strategy: 'jwt',
		},
		providers: [
			CredentialsProvider({
				name: 'Sign in',
				credentials: {
					email: {
						label: 'email',
						type: 'email',
						placeholder: 'example@example.com',
					},
					password: { label: 'password', type: 'password' },
				},
				async authorize(credentials) {
					if (!credentials?.email || !credentials.password) {
						return null
					}
					try {
						const response = await authApi.post('login', {
							json: credentials,
						})
						const apiCookies = response.headers.getSetCookie()
						if (apiCookies && apiCookies.length > 0) {
							apiCookies.forEach((cookie) => {
								const parsedCookie = parse(cookie)
								const [cookieName, cookieValue] =
									Object.entries(parsedCookie)[0]
								const httpOnly = cookie.includes('HttpOnly')
								console.log()

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

						return response.json()
					} catch (error) {
						console.log(error)
						return null
					}
				},
			}),
		],
		callbacks: {
			session: ({ session, token, user }) => {
				console.log(token)
				session.user = user
				return session
			},
			jwt: ({ token, user, account, session, profile }) => {
				console.log(account, session, profile, token)
				return { ...token, user }
			},
		},
		events: {
			signOut: ({ session, token }) => {
				cookies().set({
					name: 'Set-cookie',
					value: '',
					maxAge: 0,
				})
			},
		},
	}
}
