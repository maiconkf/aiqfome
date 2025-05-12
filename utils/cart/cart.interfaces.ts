import {
	IFlavor,
	IFlavorSize,
	ISideOption,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { CartItem } from '@/store/cart/cart.interfaces'

export interface IHandleAddToCart {
	targetFlavor?: IFlavor | null
	selectedSize?: IFlavorSize | null
	selectedSides: ISideOption[]
	sides?: {
		required: boolean
	} | null
	isDrinkOrDessert: boolean
	estabelecimento: string
	produto: string
	storeId: string
	quantity?: number
	addToCart: (
		item: CartItem,
		storeId: string,
		storeName: string,
		storeImage: string,
		storeMinimunOrderValue: number,
		storeDeliveryFee: number,
		storeFreeDeliveryMinimum: number | null
	) => void
}
