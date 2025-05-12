'use client'

import { useState, useEffect } from 'react'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { IQuantitiesSection } from './quantities.interfaces'
import { useParams } from 'next/navigation'
import { handleAddToCart } from '@/utils/cart'

export default function QuantitiesSection({
	itemInCart,
	selectedSides,
	selectedSize,
	targetFlavor,
	storeId,
	isDrinkOrDessert,
	sides,
	quantity,
	setSelectedSides,
	setQuantity,
}: IQuantitiesSection) {
	const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } =
		useCartStore()
	const { estabelecimento, produto } = useParams()

	const [showAddButton, setShowAddButton] = useState(true)

	useEffect(() => {
		console.log(itemInCart)
		if (itemInCart) {
			setShowAddButton(false)
			setQuantity(itemInCart.quantity)
		} else if (quantity > 0 && !showAddButton) {
			setShowAddButton(false)
		} else {
			setShowAddButton(true)
			setQuantity(isDrinkOrDessert ? 1 : 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemInCart, setQuantity])

	const getUnitPrice = () => {
		if (selectedSize)
			return selectedSize.discount_price ?? selectedSize.full_price
		return targetFlavor?.discount_price ?? targetFlavor?.full_price ?? 0
	}

	const calculateTotalPrice = () => {
		const minQuantity = quantity === 0 ? 1 : quantity
		const unitPrice = getUnitPrice() * minQuantity

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
		setQuantity(1)
		setShowAddButton(false)

		handleAddToCart({
			targetFlavor,
			selectedSize,
			selectedSides,
			sides,
			isDrinkOrDessert,
			estabelecimento: estabelecimento as string,
			produto: produto as string,
			storeId,
			quantity,
			addToCart,
		})
	}

	const handleIncrease = () => {
		if (itemInCart) increaseQuantity(itemInCart.id)
		else setQuantity(quantity + 1)
	}

	const handleDecrease = () => {
		if (itemInCart) decreaseQuantity(itemInCart.id)
		else setQuantity(quantity - 1)
	}

	const handleRemoveFromCart = () => {
		if (itemInCart) {
			removeFromCart(itemInCart.id)
			setSelectedSides([])
			setShowAddButton(true)
		} else {
			setQuantity(0)
		}

		setShowAddButton(true)
	}

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
					<div className="flex items-center">
						{(itemInCart && itemInCart.quantity > 1) || quantity > 1 ? (
							<button
								className="cursor-pointer p-0.5 touch-manipulation"
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
								className="cursor-pointer p-1.75 touch-manipulation"
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
							{itemInCart ? itemInCart.quantity : quantity}
						</p>
						<button
							className="cursor-pointer p-0.5 touch-manipulation"
							onClick={handleIncrease}
						>
							<Image
								src="/icons/add.svg"
								width={32}
								height={32}
								alt="Adicionar"
							/>
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
