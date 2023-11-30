'use client'
import AddVideoIcon from '@/assets/svg/add-video_icon.svg'
import s from './add-video-button.module.scss'
import { BaseText } from '@/shared/ui'

export const AddVideoButton = () => {
	return (
		<button
			onClick={() => alert('add video popup open')}
			className={s.addVideoButton}
		>
			<AddVideoIcon />
			<BaseText variant='primary'>Add video</BaseText>
		</button>
	)
}
