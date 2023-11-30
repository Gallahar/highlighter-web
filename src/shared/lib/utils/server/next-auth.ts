import { authApi } from '@/shared/api'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

export const nextAuthOptions = {
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge:
			new Date().getSeconds() + Number(process.env.JWT_EXPIRATION ?? 3600),
	},
	providers: [
		CredentialsProvider({
			id: 'sign-in',
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
					const token = response.headers.get('Bearer')
					if (token) {
						cookies().set('Bearer', token)
					}

					return response.json()
				} catch (error) {
					console.log(error)
					return null
				}
			},
		}),
		CredentialsProvider({
			id: 'confirmed-email',
			name: 'Confirmed Email',
			credentials: {},
			async authorize(_) {
				const authCookie = cookies().get('Bearer')
				if (!authCookie) {
					return null
				}
				const { name, value } = authCookie
				try {
					const response = await authApi.get('refresh', {
						headers: { Authorization: `Bearer ${value}` },
					})

					const token = response.headers.get('Bearer')
					if (token) {
						cookies().set('Bearer', token)
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
		session: ({ session, token }) => {
			session.user = token
			return session
		},
		jwt: ({ token, user }) => {
			return { ...user, ...token }
		},
		redirect: ({ baseUrl, url }) => {
			if (url.startsWith('http://')) {
				return url
			} else {
				return `${baseUrl}${url}`
			}
		},
	},
	events: {
		signOut: ({ token }) => {
			cookies().set({
				name: 'Bearer',
				value: '',
				maxAge: 0,
			})
		},
	},
} satisfies AuthOptions
