import { ReactNode } from 'react'
import s from './layout.module.scss'
import { Sidebar } from '../sidebar/sidebar'

export const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={s.layout}>
			<Sidebar />
			{children}
		</div>
	)
}
