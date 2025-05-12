export interface ICategory {
	id: string
	name: string
}

export interface IBusinessHours {
	opening: string
	closing: string
}

export interface IStores {
	id: string
	name: string
	delivery_fee: number
	delivery_time: string
	distance_km: number
	free_delivery_minimum: number | null
	business_hours: IBusinessHours
	minimum_order_value: number | null
	categories: ICategory[]
}

export interface IStoresProps {
	stores: IStores[]
}
