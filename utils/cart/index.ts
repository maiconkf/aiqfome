import { v4 as uuidv4 } from 'uuid'
import storesData from '@/app/data/stores.json'
import { IHandleAddToCart } from './cart.interfaces'

export const handleAddToCart = ({
	targetFlavor,
	selectedSize,
	selectedSides,
	sides,
	isDrinkOrDessert,
	estabelecimento,
	produto,
	storeId,
	quantity,
	addToCart,
}: IHandleAddToCart) => {
	if (sides?.required && selectedSides.length === 0 && !isDrinkOrDessert) return

	const itemId = `${targetFlavor?.slug}-${uuidv4()}`
	const product_url = `/estabelecimento/${estabelecimento}/produto/${produto}`

	const discount_price =
		selectedSize?.discount_price ?? targetFlavor?.discount_price ?? null
	const full_price = selectedSize?.full_price ?? targetFlavor?.full_price ?? 0

	const storeData = storesData.stores.find(store => store.id === storeId)
	const storeName = storeData?.name ?? ''
	const storeImage = storeData?.logo ?? ''
	const storeMinimunOrderValue = storeData?.minimum_order_value ?? 0
	const storeDeliveryFee = storeData?.delivery_fee ?? 0
	const storeFreeDeliveryMinimum = storeData?.free_delivery_minimum ?? null

	addToCart(
		{
			id: itemId,
			flavor: targetFlavor,
			quantity: quantity ?? 1,
			size: selectedSize ?? undefined,
			sides: selectedSides.length > 0 ? selectedSides : undefined,
			product_url,
			discount_price,
			full_price,
		},
		{
			id: storeId,
			name: storeName,
			image: storeImage,
			minimun_order_value: storeMinimunOrderValue,
			delivery_fee: storeDeliveryFee,
			free_delivery_minimun: storeFreeDeliveryMinimum,
		}
	)
}
