import { Login } from '@/_pages/login'
import type { Metadata } from 'next'
//example meta

export const metadata: Metadata = {
	title: 'Login',
	description: 'Sign in to our service',
}

export default async function LoginPage() {
	return <Login />
}
