import { nextAuthOptions } from '@/shared/lib/utils/server/next-auth'
import NextAuth from 'next-auth/next'

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
