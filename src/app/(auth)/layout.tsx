import { Logo } from '@/shared/ui/backgrounds/Logo'
import s from './layout.module.scss'
import { Divider } from '@/shared/ui/backgrounds/Divider'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const session = await getServerSession()
	// if (session?.user) {
	// 	redirect('/games')
	// }

	return (
		<div className={s.layout}>
			<div className={s.leftBlock}>
				<header className={s.header}>
					<Logo />
					<Divider />
				</header>
				<main className={s.pageWrapper}>{children}</main>
				<footer className={s.footer}>
					<Divider />
					<small className={s.copyright}>2023 © All rights reserved</small>
				</footer>
			</div>
			<div className={s.rightBlock} />
		</div>
	)
}
