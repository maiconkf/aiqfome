import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatPrice = (value: number) => {
	return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export const scrollToSession = (id: string) => {
	const section = document.getElementById(id)

	if (section) {
		const headerHeight = 75
		const sectionPosition = section.getBoundingClientRect().top
		const offsetPosition = sectionPosition + window.pageYOffset - headerHeight

		setTimeout(
			() =>
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				}),
			500
		)
	}
}

export const isStoreClosed = (businessHours: {
	opening: string
	closing: string
}): boolean => {
	const now = dayjs().utc().tz('America/Sao_Paulo')
	const currentTime = now.hour() * 60 + now.minute()

	const [openingHour, openingMinute] = businessHours.opening
		.split(':')
		.map(Number)
	const [closingHour, closingMinute] = businessHours.closing
		.split(':')
		.map(Number)

	const openingTime = openingHour * 60 + openingMinute
	const closingTime = closingHour * 60 + closingMinute

	return currentTime < openingTime || currentTime > closingTime
}
