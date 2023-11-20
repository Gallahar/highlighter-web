import type { DefaultSession } from 'next-auth'
import { User as MyUser } from './user.interface'

declare module 'next-auth' {
	interface User extends MyUser {}

	interface Session extends DefaultSession {
		user: User
	}
}
