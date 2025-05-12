'use client'

import { ISideOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { ISides } from './sides.interfaces'
import ErrorMessage from '@/components/ErrorMessage'
import { handleAddToCart } from '@/utils/cart'
import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

export default function SidesSection({
	itemInCart,
	sides,
	selectedSize,
	selectedSides,
	sidesError,
	estabelecimento,
	produto,
	storeId,
	isDrinkOrDessert,
	targetFlavor,
	quantity,
	setQuantity,
	setSelectedSides,
	updateCartItem,
	setSidesError,
}: ISides) {
	const { addToCart, removeFromCart } = useCartStore()

	useEffect(() => {
		if (selectedSides.length > 0 && !itemInCart && quantity > 0) {
			handleAddToCart({
				targetFlavor,
				selectedSize,
				selectedSides,
				sides,
				estabelecimento: estabelecimento as string,
				produto: produto as string,
				storeId,
				isDrinkOrDessert,
				quantity,
				addToCart,
			})
		}
	}, [
		addToCart,
		estabelecimento,
		isDrinkOrDessert,
		itemInCart,
		produto,
		quantity,
		selectedSides,
		selectedSize,
		sides,
		storeId,
		targetFlavor,
	])

	useEffect(() => {
		if (!itemInCart) return

		updateCartItem(itemInCart.id, {
			...itemInCart,
			sides: selectedSides,
		})

		if (
			!itemInCart.sides ||
			(itemInCart.sides &&
				Array.isArray(itemInCart.sides) &&
				itemInCart.sides.length === 0)
		) {
			setQuantity(quantity)
			removeFromCart(itemInCart.id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemInCart, removeFromCart, selectedSides, setQuantity, updateCartItem])

	const handleSideSelection = (side: ISideOption) => {
		setSelectedSides(prevSides => {
			const sideIndex = prevSides.findIndex(s => s.name === side.name)

			if (sideIndex !== -1) {
				const newSides = [...prevSides]
				newSides.splice(sideIndex, 1)
				setSidesError('')
				return newSides
			}

			if (prevSides.length < sides.limit) {
				const newSides = [...prevSides, side]
				setSidesError('')
				return newSides
			}

			setSidesError(
				`Você pode selecionar no máximo ${sides.limit} acompanhamentos.`
			)
			setTimeout(() => setSidesError(''), 3000)
			return prevSides
		})
	}

	return (
		<section
			className="border-solid border-[#EEF0F5] border-b-4"
			id="sides-section"
		>
			<div className="container mx-auto px-4 sm:px-0 pt-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-[#393A3C] font-bold mb-0.5">acompanhamentos</p>
						<p className="font-semibold text-[#6D6F73] text-sm mr-1">
							escolha{' '}
							{sides.required ? `de 1 a ${sides.limit}` : `até ${sides.limit}`}
						</p>
					</div>
					{sides.required && (
						<p className="bg-[#393A3C] rounded-lg px-2 py-1.5 text-white font-bold text-xs">
							obrigatório
						</p>
					)}
				</div>

				{sidesError && <ErrorMessage error={sidesError} />}

				<div className="mt-4">
					{sides.options.map((side, idx) => {
						const isSelected = selectedSides.some(s => s.name === side.name)

						return (
							<div
								key={idx}
								className="flex items-center justify-between mb-6 cursor-pointer"
								onClick={() => handleSideSelection(side)}
							>
								<div className="flex items-center flex-1 cursor-pointer">
									<input
										type="checkbox"
										className="w-4 h-4 my-1 ml-1 mr-3"
										checked={isSelected}
										onChange={e => e.stopPropagation()}
									/>
									<p className="text-sm text-[#6D6F73]">{side.name}</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
