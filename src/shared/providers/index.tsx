'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<SWRConfig>{children}</SWRConfig>
		</SessionProvider>
	)
}
