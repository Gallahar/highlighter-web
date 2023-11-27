import { LoginForm } from '@/features/auth'
import { Heading, BaseText, CustomLink } from '@/shared/ui'
import s from './login.module.scss'

export const Login = () => {
	return (
		<section className={s.login}>
			<Heading variant='h1'>login to continue</Heading>
			<LoginForm />
			<div className={s.linkSection}>
				<BaseText isItalic>
					{"Don't have an account yet?"}
					<CustomLink isAccent href={'/register'}>
						Create here
					</CustomLink>
				</BaseText>
				<CustomLink href={'/'}>Forgot your password?</CustomLink>
			</div>
		</section>
	)
}
