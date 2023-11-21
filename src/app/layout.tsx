import './global.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/shared/providers'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

const inter = Inter({
	weight: ['400'],
	variable: '--font-primary',
	subsets: ['latin', 'cyrillic'],
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
