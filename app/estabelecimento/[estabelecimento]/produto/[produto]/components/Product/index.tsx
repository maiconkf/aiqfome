import Image from 'next/image'
import { IProductSection } from './product.interfaces'
import { formatPrice } from '@/utils/price'

export default function ProductSection({
	image,
	name,
	minimunPrice,
	description,
}: IProductSection) {
	return (
		<>
			<section className="max-w-[1920]">
				<Image
					src={image}
					width={1920}
					height={195}
					alt={name}
					className="min-h-[195] object-cover object-center"
					priority
				/>
			</section>
			<section
				id="product-section"
				className="container mx-auto py-4 px-4 sm:px-0"
			>
				<h1 className="text-xl text-[#393A3C] font-bold mb-1.5">{name}</h1>

				<div className="flex items-center mb-1.5">
					<p className="text-sm font-extrabold text-[#6D6F73] mr-2">
						a partir de
					</p>
					<p className="text-lg font-extrabold text-[#7B1FA2]">
						{formatPrice(minimunPrice)}
					</p>
				</div>
				{description && (
					<p className="text-sm font-semibold text-[#6D6F73]">{description}</p>
				)}
			</section>
		</>
	)
}
