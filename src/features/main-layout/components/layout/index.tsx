import { ReactNode } from 'react'
import s from './layout.module.scss'
import { Sidebar } from '../sidebar/sidebar'
import { Header } from '../header'

export const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={s.layout}>
			<Sidebar />
			<Header />
			<main className={s.mainContent}>{children}</main>
		</div>
	)
}
