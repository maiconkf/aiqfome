import {
	IFlavor,
	IFlavorSize,
} from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'

export interface ISizesSection {
	targetFlavor?: IFlavor
	selectedSize?: IFlavorSize | null
	handleSizeChange: (size: IFlavorSize) => void
}
