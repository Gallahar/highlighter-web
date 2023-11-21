export const ccn = (
	...classes: (string | undefined | { [key: string]: boolean })[]
) =>
	classes.reduce((acc: string, className) => {
		if (!className) {
			return acc
		}

		if (typeof className === 'string') {
			return `${acc} ${className}`
		} else {
			const keys = Object.keys(className)
			return `${acc} ${keys.reduce(
				(clsKey, current) =>
					className[current] === true ? `${clsKey} ${current}` : `${clsKey}`,
				''
			)}`
		}
	}, '')
