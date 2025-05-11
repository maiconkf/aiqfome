export interface IUtensil {
	name: string
	value: number
}

export interface ISideOption {
	name: string
}

export interface ISides {
	required: boolean
	limit: number
	options: ISideOption[]
}

export interface IExtraOption {
	name: string
	value: number
}

export interface IExtras {
	limit: number
	options: IExtraOption[]
}

export interface IFlavorSize {
	name: string
	full_price: number
	discount_price: number | null
}

export interface IFlavor {
	name: string
	description?: string | null
	vegetarian: boolean
	spicy: boolean
	sizes: IFlavorSize[] | null
	full_price?: number
	discount_price?: number | null
	slug: string
	image: string
	utensils?: IUtensil[] | null
	isDrinkOrDessert: boolean
}

export interface IDrinkOption {
	name: string
	value: number
}

export interface IDrinks {
	limit: number | null
	options: IDrinkOption[]
}

export interface IProductData {
	name: string
	description: string
	money_icon?: boolean
	flavors: IFlavor[]
}

export interface IStoreData {
	items: IProductData[]
	sides: ISides | null
	extras: IExtras | null
	drinks: IDrinks
}

export interface IProductsJson {
	products: {
		[store_id: string]: IStoreData
	}
}
