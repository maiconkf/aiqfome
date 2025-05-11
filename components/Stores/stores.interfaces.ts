export interface ICategory {
	id: string
	name: string
}

export interface IStores {
	id: string
	name: string
	delivery_fee: number
	delivery_time: string
	distance_km: number
	free_delivery_minimum: number | null
	business_hours: {
		opening: string
		closing: string
	}
	minimum_order_value: number | null
	categories: ICategory[]
}

export interface IStoresProps {
	stores: IStores[]
}
