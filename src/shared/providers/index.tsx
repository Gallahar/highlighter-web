'use client'

import { GlobalStyles, StyledComponentsRegistry } from '@/shared/styled-components'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SWRConfig>
			<StyledComponentsRegistry>
				<GlobalStyles />
				{children}
			</StyledComponentsRegistry>
		</SWRConfig>
	)
}
