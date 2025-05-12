import { IUtensil } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ICartItem } from '@/store/cart/cart.interfaces'
import { IFlavor } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { IFlavorSize } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ISideOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ISidesObject } from '../Sides/sides.interfaces'

export interface IUtensilsSession {
	utensils: IUtensil[]
	itemInCart?: ICartItem
	targetFlavor?: IFlavor
	selectedSize?: IFlavorSize | null
	selectedSides: ISideOption[]
	sides: ISidesObject | null
	storeId: string
	setSidesError: (error: string) => void
}
