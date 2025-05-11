'use client'

import { ISideOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { useCallback } from 'react'
import { ISides } from './sides.interfaces'
import { useCartStore } from '@/store/cart'
import ErrorMessage from '@/components/ErrorMessage'

export default function SidesSection({
	itemInCart,
	sides,
	selectedSides,
	sidesError,
	setSelectedSides,
	updateCartItem,
	setSidesError,
}: ISides) {
	const { removeFromCart } = useCartStore()

	const handleSideSelection = useCallback(
		(side: ISideOption) => {
			setSelectedSides((prevSides: ISideOption[]) => {
				const sideIndex = prevSides.findIndex(s => s.name === side.name)
				let newSelectedSides: ISideOption[]

				if (sideIndex !== -1) {
					newSelectedSides = [...prevSides]
					newSelectedSides.splice(sideIndex, 1)

					if (itemInCart) {
						if (newSelectedSides.length === 0) {
							removeFromCart(itemInCart.id)
						} else {
							updateCartItem(itemInCart.id, {
								...itemInCart,
								sides: newSelectedSides,
							})
						}
					}

					setSidesError('')
				} else {
					if (prevSides.length < sides.limit) {
						newSelectedSides = [...prevSides, side]

						if (itemInCart) {
							updateCartItem(itemInCart.id, {
								...itemInCart,
								sides: newSelectedSides,
							})
						}

						setSidesError('')
					} else {
						setSidesError(
							`Você pode selecionar no máximo ${sides.limit} acompanhamentos.`
						)
						setTimeout(() => setSidesError(''), 3000)
						return prevSides
					}
				}

				return newSelectedSides
			})
		},
		[
			itemInCart,
			removeFromCart,
			sides.limit,
			updateCartItem,
			setSidesError,
			setSelectedSides,
		]
	)

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
										onChange={e => {
											e.stopPropagation()
											handleSideSelection(side)
										}}
										onClick={e => e.stopPropagation()}
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
