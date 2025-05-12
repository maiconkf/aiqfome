import { IUtensilsSession } from './utensils.interfaces'
import { useCartStore } from '@/store/cart'
import { IUtensil } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { useState } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { scrollToSession } from '@/utils/scroll'
import { formatPrice } from '@/utils/price'

export default function UtensilsSession({
	utensils,
	itemInCart,
}: IUtensilsSession) {
	const { updateCartItem } = useCartStore()
	const [showUtensilsError, setUtensilsError] = useState('')

	const handleChange = (selected: IUtensil) => {
		if (!itemInCart) {
			setUtensilsError('Adicione o produto antes de selecionar o talher.')

			scrollToSession('product-section')

			setTimeout(() => setUtensilsError(''), 3000)

			return
		}

		updateCartItem(itemInCart.id, {
			...itemInCart,
			utensils: selected,
		})
	}

	const selectedUtensil = itemInCart?.utensils?.name

	return (
		<section className="border-solid border-[#EEF0F5] border-b-4">
			<div className="container mx-auto px-4 sm:px-0 pt-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-[#393A3C] font-bold mb-0.5">
							precisa de talher?
						</p>
						<p className="font-semibold text-[#6D6F73] text-sm mr-1">
							escolha até 1
						</p>
					</div>
				</div>
				{showUtensilsError && <ErrorMessage error={showUtensilsError} />}
				<div className="mt-4">
					{utensils.map((utensil, idx) => {
						return (
							<div key={idx} className="flex items-center justify-between mb-6">
								<label className="flex items-center">
									<input
										type="radio"
										className="w-4 h-4 my-1 ml-1 mr-3"
										name="utensil"
										checked={selectedUtensil === utensil.name}
										onChange={() => handleChange(utensil)}
									/>
									<p className="text-sm text-[#6D6F73]">{utensil.name}</p>
								</label>
								{utensil.value > 0 && (
									<p className="text-sm font-bold text-[#7B1FA2]">
										+${formatPrice(utensil.value)}
									</p>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
