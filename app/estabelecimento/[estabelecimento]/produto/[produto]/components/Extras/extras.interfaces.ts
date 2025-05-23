import { ICartItem } from '@/store/cart/cart.interfaces'
import { Dispatch, SetStateAction } from 'react'
import { IExtraOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'

export interface IExtrasSection {
	itemInCart: ICartItem | undefined
	extras: IExtrasObject
	selectedExtras: IExtraOption[]
	setSelectedExtras: Dispatch<SetStateAction<IExtraOption[]>>
	updateCartItem: (id: string, item: ICartItem) => void
}

export interface IExtrasObject {
	limit: number
	options: IExtraOption[]
}
