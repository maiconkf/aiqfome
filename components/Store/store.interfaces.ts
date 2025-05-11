export interface IStore {
	id: string
	name: string
	logo: string
	delivery_fee: number | null
	delivery_time: string
	distance_km: number
	free_delivery_minimum: number | null
	business_hours: {
		opening: string
		closing: string
	}
	minimum_order_value: number | null
	rating: number
}

export interface IStoreProps {
	store: IStore
	isClosed: boolean
}
