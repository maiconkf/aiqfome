import {
	IExtraOption,
	IFlavor,
	IFlavorSize,
	ISideOption,
	IUtensil,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { IDrinkWithQuantity } from '@/app/estabelecimento/[estabelecimento]/produto/[produto]/components/Drinks/drinks.interfaces'

export interface ICartItem {
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

export interface IStoreItem {
	id: string | null
	name: string | null
	image: string | null
	minimun_order_value: number
	delivery_fee: number
	free_delivery_minimun: number | null
}

export interface ICartState {
	items: ICartItem[]
	store: IStoreItem | null
	addToCart: (item: ICartItem, store: IStoreItem) => void
	increaseQuantity: (id: string) => void
	decreaseQuantity: (id: string) => void
	updateCartItem: (id: string, updatedItem: ICartItem) => void
	removeFromCart: (id: string) => void
	totalPrice: (includeDeliveryFee?: boolean) => number
}
