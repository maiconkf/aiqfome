'use client'

import { useCartStore } from '@/store/cart'
import { ChangeEvent, useCallback } from 'react'
import { ObservationsSessionProps } from './observations.interfaces'

export default function ObservationsSession({
	itemInCart,
}: ObservationsSessionProps) {
	const { updateCartItem } = useCartStore()

	const handleObservationsChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			if (itemInCart) {
				updateCartItem(itemInCart.id, {
					...itemInCart,
					observations: e.target.value,
				})
			}
		},
		[itemInCart, updateCartItem]
	)

	return (
		<section className="container mx-auto px-4 sm:px-0 pt-6 pb-17">
			<textarea
				className="min-h-[66] rounded-lg border border-solid border-[#CDD1D9] block w-full p-3 outline-0 font-semibold text-sm text-[#6D6F73]"
				placeholder={`alguma observação do item? • opcional\nex: tirar algum ingrediente, ponto do prato`}
				value={itemInCart?.observations ?? ''}
				onChange={handleObservationsChange}
				disabled={!itemInCart}
			></textarea>
		</section>
	)
}
