import type { DefaultSession } from 'next-auth'
import { User as MyUser } from './user.interface'

declare module 'next-auth' {
	interface Session {
		user: User
	}
}
