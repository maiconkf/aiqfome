import { ISideOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { CartItem } from '@/store/cart/cart.interfaces'
import { Dispatch, SetStateAction } from 'react'

export interface ISides {
	itemInCart: CartItem | undefined
	sides: ISidesObject
	selectedSides: ISideOption[]
	sidesError: string
	setSelectedSides: Dispatch<SetStateAction<ISideOption[]>>
	updateCartItem: (id: string, item: CartItem) => void
	setSidesError: (msg: string) => void
}

export interface ISidesObject {
	required: boolean
	limit: number
	options: ISideOption[]
}
