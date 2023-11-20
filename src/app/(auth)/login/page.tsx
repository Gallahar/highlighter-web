import { LoginForm } from '@/features/auth/forms'
import { Heading } from '@/shared/ui/typography/Heading'
import s from './login.module.scss'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { BaseText } from '@/shared/ui/typography/BaseText'

export default async function Login() {
	return (
		<section className={s.login}>
			<Heading variant='h1'>login to continue</Heading>
			<LoginForm />
			<div className={s.linkSection}>
				<BaseText isItalic>
					Don't have an account yet?{' '}
					<CustomLink isAccent href={'/register'}>
						Create here
					</CustomLink>
				</BaseText>
				<CustomLink href={'/'}>Forgot your password?</CustomLink>
			</div>
		</section>
	)
}