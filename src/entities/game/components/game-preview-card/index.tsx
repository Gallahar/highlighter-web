import { GamePreview } from '@/shared/types'
import s from './game-preview-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { BaseText } from '@/shared/ui'

export const GamePreviewCard = ({
	icon,
	title,
	slug,
}: Omit<GamePreview, '_id'>) => {
	return (
		<Link href={`/games/${slug}`}>
			<div className={s.cardWrapper}>
				<div className={s.imageWrapper}>
					<Image
						fill
                        
						src={`https://highlighter-server-bucket.s3.amazonaws.com/${icon}`}
						alt={`game-${slug}`}
					/>
				</div>
				<BaseText variant='primary'>{title}</BaseText>
			</div>
		</Link>
	)
}
