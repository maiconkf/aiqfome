import { IDrinkOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { CartItem } from '@/store/cart/cart.interfaces'

export interface IDrinksSectionProps {
	drinks: {
		limit: number | null
		options: IDrinkOption[]
	}
	initialDrinks?: IDrinkWithQuantity[]
	itemInCart?: CartItem
}

export interface IQuantities {
	[drinkName: string]: number
}

export interface IDrinkWithQuantity extends IDrinkOption {
	quantity: number
}
