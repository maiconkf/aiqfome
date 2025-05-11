'use client'

import { formatPrice } from '@/utils'
import Image from 'next/image'
import { ISizesSection } from './sizes.interfaces'

export default function SizesSection({
	targetFlavor,
	selectedSize,
	handleSizeChange,
}: ISizesSection) {
	return (
		<section className="border-solid border-[#EEF0F5] border-b-4">
			<div className="container mx-auto px-4 sm:px-0 pt-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-[#393A3C] font-bold mb-0.5">qual o tamanho?</p>
						<p className="font-semibold text-[#6D6F73] text-sm mr-1">
							escolha 1
						</p>
					</div>
					<p className="bg-[#393A3C] rounded-lg px-2 py-1.5 text-white font-bold text-xs">
						obrigatório
					</p>
				</div>
				<div className="mt-4">
					{targetFlavor?.sizes?.map((size, idx) => {
						return (
							<div key={idx} className="flex items-center justify-between mb-6">
								<label className="flex items-center">
									<input
										type="radio"
										className="w-4 h-4 my-1 ml-1 mr-3"
										checked={selectedSize?.name === size.name}
										onChange={() => handleSizeChange(size)}
									/>
									{size.discount_price && (
										<Image
											src="/icons/money.svg"
											width={18}
											height={18}
											alt="Item promocional"
										/>
									)}
									<p
										className={`text-sm text-[#6D6F73] ${
											size.discount_price ? 'ml-2' : ''
										}`}
									>
										{size.name}
									</p>
								</label>
								{size.discount_price ? (
									<p className="text-xs font-bold text-[#6D6F73]">
										de {formatPrice(size.full_price)} por{' '}
										<span className="text-sm text-[#02A117]">
											{formatPrice(size.discount_price)}
										</span>
									</p>
								) : (
									<p className="text-sm font-bold text-[#7B1FA2]">
										{formatPrice(size.full_price)}
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
