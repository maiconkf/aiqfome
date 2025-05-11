'use client'

import { useState, useEffect } from 'react'
import { formatPrice, scrollToSession } from '@/utils'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { useCartStore } from '@/store/cart'
import { IQuantitiesSection } from './quantities.interfaces'
import { useParams } from 'next/navigation'
import storesData from '@/app/data/stores.json'

export default function QuantitiesSection({
	itemInCart,
	selectedSides,
	selectedSize,
	targetFlavor,
	sides,
	storeId,
	isDrinkOrDessert,
	setSidesError,
}: IQuantitiesSection) {
	const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } =
		useCartStore()
	const { estabelecimento, produto } = useParams()

	const [quantity, setQuantity] = useState(1)
	const [showAddButton, setShowAddButton] = useState(true)

	useEffect(() => {
		if (itemInCart) {
			setShowAddButton(false)
			setQuantity(itemInCart.quantity)
		} else {
			setShowAddButton(true)
			setQuantity(1)
		}
	}, [itemInCart])

	useEffect(() => {
		if (!targetFlavor) return

		if (itemInCart) {
			setShowAddButton(false)
			setQuantity(itemInCart.quantity)
		} else {
			setShowAddButton(true)
			setQuantity(1)
		}
	}, [targetFlavor, itemInCart])

	const getUnitPrice = () => {
		if (selectedSize)
			return selectedSize.discount_price ?? selectedSize.full_price
		return targetFlavor?.discount_price ?? targetFlavor?.full_price ?? 0
	}

	const calculateTotalPrice = () => {
		const unitPrice = getUnitPrice() * quantity

		const drinksTotal =
			itemInCart?.drinks?.reduce((acc, drink) => {
				return acc + drink.value * drink.quantity
			}, 0) ?? 0

		const utensilsTotal = itemInCart?.utensils?.value ?? 0

		const extrasTotal =
			itemInCart?.extras?.reduce((acc, extra) => {
				return acc + extra.value
			}, 0) ?? 0

		return unitPrice + drinksTotal + utensilsTotal + extrasTotal
	}

	const handleAdd = () => {
		if (sides?.required && selectedSides.length === 0 && !isDrinkOrDessert) {
			scrollToSession('sides-section')

			setSidesError(`Selecione ao menos 1 acompanhamento.`)

			return
		}

		setShowAddButton(false)

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
				quantity: 1,
				size: selectedSize ?? undefined,
				sides: selectedSides.length > 0 ? selectedSides : undefined,
				product_url,
				discount_price,
				full_price,
			},
			storeId,
			storeName,
			storeImage,
			storeMinimunOrderValue,
			storeDeliveryFee,
			storeFreeDeliveryMinimum
		)
	}

	const handleIncrease = () => itemInCart && increaseQuantity(itemInCart.id)
	const handleDecrease = () => itemInCart && decreaseQuantity(itemInCart.id)
	const handleRemoveFromCart = () => itemInCart && removeFromCart(itemInCart.id)

	return (
		<section className="mt-2 border-solid border-[#EEF0F5] border-b-4">
			<div className="container mx-auto px-4 sm:px-0 flex items-center justify-between pb-6">
				<div>
					<p className="text-[#393A3C] font-bold mb-0.5">quantos?</p>
					<div className="flex items-center">
						<p className="font-semibold text-[#6D6F73] text-sm mr-1">total</p>
						<p className="font-bold text-sm text-[#393A3C]">
							{formatPrice(calculateTotalPrice())}
						</p>
					</div>
				</div>
				{showAddButton ? (
					<button
						onClick={handleAdd}
						className="bg-[#6D6F73] rounded-lg px-6 py-2.5 cursor-pointer text-white font-bold text-sm"
					>
						adicionar
					</button>
				) : (
					itemInCart && (
						<div className="flex items-center">
							{itemInCart.quantity > 1 ? (
								<button
									className="cursor-pointer p-0.5"
									onClick={handleDecrease}
								>
									<Image
										src="/icons/decrease.svg"
										width={32}
										height={32}
										alt="Diminuir"
									/>
								</button>
							) : (
								<button
									className="cursor-pointer p-1.75"
									onClick={handleRemoveFromCart}
								>
									<Image
										src="/icons/trash.svg"
										width={22}
										height={23}
										alt="Remover"
									/>
								</button>
							)}
							<p className="min-w-8 mx-1 text-center font-bold text-[#393A3C]">
								{itemInCart.quantity}
							</p>
							<button className="cursor-pointer p-0.5" onClick={handleIncrease}>
								<Image
									src="/icons/add.svg"
									width={32}
									height={32}
									alt="Adicionar"
								/>
							</button>
						</div>
					)
				)}
			</div>
		</section>
	)
}
