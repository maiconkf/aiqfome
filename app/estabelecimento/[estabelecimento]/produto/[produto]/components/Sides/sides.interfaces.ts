import {
	IFlavor,
	IFlavorSize,
	ISideOption,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ICartItem } from '@/store/cart/cart.interfaces'
import { Dispatch, SetStateAction } from 'react'

export interface ISides {
	itemInCart: ICartItem | undefined
	sides: ISidesObject
	selectedSize: IFlavorSize | null
	selectedSides: ISideOption[]
	sidesError: string
	estabelecimento: string
	produto: string
	storeId: string
	isDrinkOrDessert: boolean
	targetFlavor?: IFlavor
	quantity: number
	setQuantity: (value: number) => void
	setSelectedSides: Dispatch<SetStateAction<ISideOption[]>>
	updateCartItem: (id: string, item: ICartItem) => void
	setSidesError: (msg: string) => void
}

export interface ISidesObject {
	required: boolean
	limit: number
	options: ISideOption[]
}
