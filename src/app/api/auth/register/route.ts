import { authApi } from '@/shared/api'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const res = await req.json()

		const { email, username, password } = res

		const response = await authApi
			.post('register', {
				json: { email: email, username: username, password: password },
			})
			.json()

		return NextResponse.json({
			email: email,
			username: username,
		})
	} catch (error) {
		// TODO handle somehow transfer message to client, or forget about this and stick with only client side .
		return NextResponse.json({ message: 'something went wrong' })
	}
}
