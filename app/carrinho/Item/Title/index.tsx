import { ITitle } from './title.interfaces'

export default function ItemTitle({ title }: ITitle) {
	return (
		<p className="text-xs text-[#6D6F73] mb-0.5 font-bold">
			<span className="mr-1">•</span>
			{title}
		</p>
	)
}
