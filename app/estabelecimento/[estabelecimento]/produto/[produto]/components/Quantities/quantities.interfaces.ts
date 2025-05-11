import {
	IFlavor,
	IFlavorSize,
	ISideOption,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { CartItem } from '@/store/cart/cart.interfaces'
import { ISidesObject } from '../Sides/sides.interfaces'

export interface IQuantitiesSection {
	itemInCart?: CartItem
	targetFlavor?: IFlavor
	selectedSize?: IFlavorSize | null
	selectedSides: ISideOption[]
	sides: ISidesObject | null
	storeId: string
	isDrinkOrDessert: boolean
	setSidesError: (msg: string) => void
}
