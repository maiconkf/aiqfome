import { IDescription } from './description.interfaces'

export default function ItemDescription({ description, hasMr3 }: IDescription) {
	return (
		<p
			className={`text-xs text-[#6D6F73] font-semibold ml-2.5 lowercase ${
				hasMr3 ? 'mr-3' : ''
			}`}
		>
			{description}
		</p>
	)
}
