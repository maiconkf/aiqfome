import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { IBusinessHours } from '@/components/Stores/stores.interfaces'

dayjs.extend(utc)
dayjs.extend(timezone)

export const isStoreClosed = (businessHours: IBusinessHours): boolean => {
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
