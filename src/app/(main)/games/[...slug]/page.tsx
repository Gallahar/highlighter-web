import { Heading } from '@/shared/ui'

export default async function Game({ params }: { params: { slug: string } }) {
	return <Heading variant='h1'>{params.slug}</Heading>
}
