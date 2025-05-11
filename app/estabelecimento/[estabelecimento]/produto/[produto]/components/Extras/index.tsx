import { formatPrice, scrollToSession } from '@/utils'
import { IExtrasSection } from './extras.interfaces'
import { IExtraOption } from '@/app/estabelecimento/[estabelecimento]/estabelecimento.interfaces'
import { useState } from 'react'
import ErrorMessage from '@/components/ErrorMessage'

export default function ExtrasSection({
	itemInCart,
	extras,
	selectedExtras,
	setSelectedExtras,
	updateCartItem,
}: IExtrasSection) {
	const [showExtrasError, setShowExtrasError] = useState('')

	const handleExtraSelection = (extra: IExtraOption) => {
		if (!itemInCart) {
			setShowExtrasError('Adicione o produto antes de selecionar o talher.')

			scrollToSession('product-section')

			setTimeout(() => setShowExtrasError(''), 3000)

			return
		}

		const isSelected = selectedExtras.some(s => s.name === extra.name)
		let newSelectedExtras: IExtraOption[]

		if (isSelected) {
			newSelectedExtras = selectedExtras.filter(s => s.name !== extra.name)
		} else {
			if (selectedExtras.length >= extras.limit) return

			newSelectedExtras = [...selectedExtras, extra]
		}

		setSelectedExtras(newSelectedExtras)

		updateCartItem(itemInCart.id, {
			...itemInCart,
			extras: newSelectedExtras.length > 0 ? newSelectedExtras : undefined,
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
						<p className="text-[#393A3C] font-bold mb-0.5">
							mais alguma coisa?
						</p>
						<p className="font-semibold text-[#6D6F73] text-sm mr-1">
							escolha até {extras.limit}
						</p>
					</div>
				</div>
				{showExtrasError && <ErrorMessage error={showExtrasError} />}
				<div className="mt-4">
					{extras.options.map((extra, idx) => {
						const isSelected = selectedExtras.some(s => s.name === extra.name)

						return (
							<div
								key={idx}
								className="flex items-center justify-between mb-6 cursor-pointer"
								onClick={() => handleExtraSelection(extra)}
							>
								<div className="flex items-center flex-1 cursor-pointer">
									<input
										type="checkbox"
										className="w-4 h-4 my-1 ml-1 mr-3"
										checked={isSelected}
										onChange={e => {
											e.stopPropagation()
											handleExtraSelection(extra)
										}}
										onClick={e => e.stopPropagation()}
									/>
									<p className="text-sm text-[#6D6F73]">{extra.name}</p>
								</div>
								{extra.value > 0 && (
									<p className="text-sm font-bold text-[#7B1FA2]">
										+{formatPrice(extra.value)}
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
