import Image from 'next/image'
import { formatPrice } from '@/utils'
import { ISubmenu } from './submenu.interfaces'

export default function Submenu({ flavor }: ISubmenu) {
	return (
		<>
			<div className="flex-1 mr-4">
				<div className="flex items-center">
					<h3 className="text-sm font-semibold text-[#202326] mr-1.5">
						{flavor.name}
					</h3>
					{flavor.spicy ? (
						<Image
							src="/icons/pepper.svg"
							width={14}
							height={13}
							alt="Produto apimentado"
						/>
					) : (
						flavor.vegetarian && (
							<Image
								src="/icons/vegetable.svg"
								width={13}
								height={14}
								alt="Produto vegetariano"
							/>
						)
					)}
				</div>
				<p className="text-xs text-[#6D6F73]">{flavor.description}</p>
			</div>
			<div className="text-right">
				{flavor.sizes ? (
					<>
						<p className="text-xs font-bold text-[#6D6F73]">a partir de</p>
						<p className="font-bold text-sm text-[#7B1FA2]">
							{formatPrice(
								flavor.sizes[0].discount_price ?? flavor.sizes[0].full_price
							)}
						</p>
					</>
				) : flavor.discount_price ? (
					<>
						<p className="text-xs font-bold text-[#6D6F73] line-through">
							{formatPrice(flavor.full_price ?? 0)}
						</p>
						<div className="flex items-center">
							<Image
								src="/icons/money.svg"
								width={12}
								height={12}
								alt="Valor promocional"
							/>
							<p className="font-bold text-sm text-[#02A117] ml-1">
								{formatPrice(flavor.discount_price)}
							</p>
						</div>
					</>
				) : (
					<p className="font-bold text-sm text-[#7B1FA2]">
						{formatPrice(flavor.full_price ?? 0)}
					</p>
				)}
			</div>
		</>
	)
}
