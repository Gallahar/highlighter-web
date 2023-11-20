import { authOptions } from '@/shared/lib/utils/nextAuth'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth/next'

function handler(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, authOptions(req, res))
}

export { handler as GET, handler as POST }