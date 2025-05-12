import {
	IExtraOption,
	IFlavor,
	IFlavorSize,
	ISideOption,
	IUtensil,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { IDrinkWithQuantity } from '@/app/estabelecimento/[estabelecimento]/produto/[produto]/components/Drinks/drinks.interfaces'

export interface CartItem {
	id: string
	quantity: number
	flavor?: IFlavor | null
	size?: IFlavorSize
	utensils?: IUtensil
	sides?: ISideOption[]
	extras?: IExtraOption[]
	drinks?: IDrinkWithQuantity[]
	observations?: string
	product_url?: string
	discount_price: number | null
	full_price: number
}

export interface CartState {
	items: CartItem[]
	storeId: string | null
	storeName: string | null
	storeImage: string | null
	storeMinimunOrderValue: number
	storeDeliveryFee: number
	storeFreeDeliveryMinimum: number | null
	addToCart: (
		item: CartItem,
		storeId: string,
		storeName: string,
		storeImage: string,
		storeMinimunOrderValue: number,
		storeDeliveryFee: number,
		storeFreeDeliveryMinimum: number | null
	) => void
	increaseQuantity: (id: string) => void
	decreaseQuantity: (id: string) => void
	updateCartItem: (id: string, updatedItem: CartItem) => void
	removeFromCart: (id: string) => void
	totalPrice: (includeDeliveryFee?: boolean) => number
}
