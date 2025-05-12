import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
	IDrinksSectionProps,
	IDrinkWithQuantity,
	IQuantities,
} from './drinks.interfaces'
import { IDrinkOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/utils/price'

export default function DrinksSection({
	drinks,
	initialDrinks,
	itemInCart,
}: IDrinksSectionProps) {
	const { updateCartItem } = useCartStore()

	const [quantities, setQuantities] = useState<IQuantities>(() => {
		if (initialDrinks && initialDrinks.length > 0) {
			return initialDrinks.reduce((acc, drink) => {
				acc[drink.name] = drink.quantity
				return acc
			}, {} as IQuantities)
		}
		return {}
	})

	const handleDrinks = useCallback(
		(selectedDrinks: IDrinkWithQuantity[]) => {
			if (itemInCart) {
				updateCartItem(itemInCart.id, {
					...itemInCart,
					drinks: selectedDrinks.length > 0 ? selectedDrinks : undefined,
				})
			}
		},
		[itemInCart, updateCartItem]
	)

	const getSelectedDrinks = useCallback(
		(currentQuantities: IQuantities): IDrinkWithQuantity[] => {
			if (!drinks || !drinks.options) return []

			return drinks.options
				.filter(drink => (currentQuantities[drink.name] ?? 0) > 0)
				.map(drink => ({
					...drink,
					quantity: currentQuantities[drink.name] ?? 0,
				}))
		},
		[drinks]
	)

	const getTotalQuantity = useCallback(
		(quantities: IQuantities): number =>
			Object.values(quantities).reduce((acc, val) => acc + val, 0),
		[]
	)

	const handleIncrease = useCallback(
		(drink: IDrinkOption) => {
			setQuantities(prev => {
				const currentTotal = getTotalQuantity(prev)
				if (drinks.limit && currentTotal >= drinks.limit) return prev

				const newQty = (prev[drink.name] ?? 0) + 1
				const newQuantities = { ...prev, [drink.name]: newQty }

				return newQuantities
			})
		},
		[drinks.limit, getTotalQuantity]
	)

	const handleDecrease = useCallback((drink: IDrinkOption) => {
		setQuantities(prev => {
			const currentQty = prev[drink.name] ?? 0
			if (currentQty === 0) return prev

			const newQty = currentQty - 1
			const newQuantities = { ...prev, [drink.name]: newQty }

			return newQuantities
		})
	}, [])

	useEffect(() => {
		const selectedDrinks = getSelectedDrinks(quantities)
		handleDrinks(selectedDrinks)
	}, [quantities, getSelectedDrinks, handleDrinks])

	useEffect(() => {
		if (initialDrinks && initialDrinks.length > 0) {
			const newQuantities = initialDrinks.reduce((acc, drink) => {
				acc[drink.name] = drink.quantity
				return acc
			}, {} as IQuantities)

			setQuantities(newQuantities)
		}
	}, [initialDrinks])

	if (!drinks || !drinks.options?.length) return <></>

	return (
		<section className="border-solid border-[#EEF0F5] border-b-4">
			<div className="container mx-auto px-4 sm:px-0 py-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-[#393A3C] font-bold mb-0.5">
							vai querer bebida?
						</p>
						<p className="font-semibold text-[#6D6F73] text-sm">
							{drinks.limit && drinks.limit > 0
								? `escolha até ${drinks.limit}`
								: 'escolha quantas quiser'}
						</p>
					</div>
				</div>

				{drinks.options.map(drink => {
					const qty = quantities[drink.name] ?? 0
					const canIncrease =
						!drinks.limit || getTotalQuantity(quantities) < drinks.limit
					const canDecrease = qty > 0

					return (
						<div
							key={drink.name}
							className="mt-4 flex items-center justify-between"
						>
							<div className="flex items-center">
								<button
									className="cursor-pointer p-0.5 disabled:opacity-50"
									onClick={() => handleDecrease(drink)}
									disabled={!canDecrease}
								>
									<Image
										src={`/icons/${
											canDecrease ? 'decrease' : 'decrease-disabled'
										}.svg`}
										width={32}
										height={32}
										alt={`Diminuir ${drink.name}`}
									/>
								</button>
								<p className="min-w-8 mx-1 text-center font-bold text-[#393A3C]">
									{qty}
								</p>
								<button
									className="cursor-pointer p-0.5 disabled:opacity-50"
									onClick={() => handleIncrease(drink)}
									disabled={!canIncrease}
								>
									<Image
										src="/icons/add.svg"
										width={32}
										height={32}
										alt={`Adicionar ${drink.name}`}
									/>
								</button>
								<p className="text-sm font-semibold text-[#6D6F73] ml-2">
									{drink.name}
								</p>
							</div>
							<div className="ml-2 text-right">
								<p className="font-bold text-sm text-[#7B1FA2]">
									+{formatPrice(drink.value)}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
