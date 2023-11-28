'use client'
import { useState } from 'react'

export const useCountdown = (from: number, callback: () => void) => {
	const [time, setTime] = useState(0)

	const timerHandler = () => {
		setTime(from)
		const intervalId = setInterval(() => setTime((time) => time - 1), 1000)
		setTimeout(() => {
			clearInterval(intervalId)
			callback()
		}, from * 1000)
	}

	return {
		currentTime: time,
		trigger: timerHandler,
	}
}
