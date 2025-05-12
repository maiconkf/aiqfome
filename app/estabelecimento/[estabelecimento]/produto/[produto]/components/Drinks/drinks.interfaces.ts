import { IDrinkOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ICartItem } from '@/store/cart/cart.interfaces'

export interface IDrinksSectionProps {
	drinks: {
		limit: number | null
		options: IDrinkOption[]
	}
	initialDrinks?: IDrinkWithQuantity[]
	itemInCart?: ICartItem
}

export interface IQuantities {
	[drinkName: string]: number
}

export interface IDrinkWithQuantity extends IDrinkOption {
	quantity: number
}
