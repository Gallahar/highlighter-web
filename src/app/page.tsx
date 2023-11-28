import { Divider } from '@/shared/ui/backgrounds/divider'
import { Logo } from '@/shared/ui/backgrounds/logo'
import s from './page.module.scss'
import { getServerSession } from 'next-auth'

async function sleep(t: number) {
	return new Promise((res) => setTimeout(() => res('go!'), t))
}

export default async function Home() {
	const user = await getServerSession()

	return (
		<main>
			{user && user.user.email}
			<Divider />
			<Logo />
		</main>
	)
}
