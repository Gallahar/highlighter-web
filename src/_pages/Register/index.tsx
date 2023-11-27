import { RegisterForm } from '@/features/auth'
import { Heading, BaseText, CustomLink } from '@/shared/ui'
import s from './register.module.scss'

export const Register = () => {
	return (
		<section className={s.register}>
			<Heading variant='h1'>create your account</Heading>
			<RegisterForm />
			<BaseText isItalic>
				Already have an Account?{' '}
				<CustomLink isAccent href={'/login'}>
					Login here
				</CustomLink>
			</BaseText>
		</section>
	)
}
