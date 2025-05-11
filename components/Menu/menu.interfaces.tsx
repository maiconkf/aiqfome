import { IFlavor } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'

export interface IMenu {
	product: {
		name: string
		description?: string
		money_icon?: boolean
		flavors?: IFlavor[]
	}
	isStoreClosed: boolean
}
