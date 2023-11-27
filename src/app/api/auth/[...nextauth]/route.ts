import NextAuth from 'next-auth/next'
import { authApi } from '@/shared/api'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

const nextAuthOptions = {
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
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
		session: ({ session, token, user }) => {
			session.user = user
			return session
		},
		jwt: ({ token, user, account, session, profile }) => {
			return { ...token, user }
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
		signOut: ({ session, token }) => {
			cookies().set({
				name: 'Bearer',
				value: '',
				maxAge: 0,
			})
		},
	},
} satisfies AuthOptions

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
