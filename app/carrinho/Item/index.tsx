import { formatPrice } from '@/utils'
import Image from 'next/image'
import { IItem } from './item.interfaces'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import ItemTitle from './Title'
import ItemDescription from './Description'

export default function ItemCart({ items }: IItem) {
	const {
		decreaseQuantity,
		increaseQuantity,
		removeFromCart,
		storeDeliveryFee,
		totalPrice,
		storeFreeDeliveryMinimum,
	} = useCartStore()
	const router = useRouter()

	return items.map((item, idx) => {
		const price = item.size
			? item.size.discount_price ?? item.size.full_price
			: item.discount_price ?? item.full_price ?? 0

		return (
			<div
				key={item.id}
				className={`py-4 ${
					idx !== items.length - 1
						? 'border-solid border-[#EEF0F5] border-b-4'
						: ''
				}`}
			>
				<div className="container mx-auto px-4 sm:px-0">
					<div className="flex items-center justify-between">
						<h2 className="font-bold text-sm text-[#202326] mr-3">
							{item.flavor?.name}
						</h2>
						<p className="font-bold text-sm text-[#7B1FA2]">
							{formatPrice(price)}
						</p>
					</div>
					<div className="flex justify-end items-center mt-2">
						<button
							className="flex items-center cursor-pointer px-1 py-2"
							onClick={() => router.push(item.product_url ?? '#')}
						>
							<Image
								src="/icons/pencil.svg"
								width={11}
								height={11}
								alt="Editar"
							/>
							<span className="text-[#00A296] font-bold text-sm ml-1.5">
								editar
							</span>
						</button>
						<div className="flex items-center ml-6.5 -mr-0.75">
							{item.quantity > 1 ? (
								<button
									className="cursor-pointer px-0.5 py-0.75 h-[38]"
									onClick={() => decreaseQuantity(item.id)}
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
									className="cursor-pointer p-1.75 h-[38]"
									onClick={() => removeFromCart(item.id)}
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
								{item.quantity}
							</p>
							<button
								className="cursor-pointer px-0.5 py-0.75 h-[38]"
								onClick={() => increaseQuantity(item.id)}
							>
								<Image
									src="/icons/add.svg"
									width={32}
									height={32}
									alt="Adicionar"
								/>
							</button>
						</div>
					</div>
					{item.size && (
						<div className="mb-1.5">
							<ItemTitle title="tamanho" />
							<ItemDescription description={item.size.name} />
						</div>
					)}
					{item.sides && item.sides.length > 0 && (
						<div className="mb-1.5">
							<ItemTitle title="acompanhamentos" />
							{item.sides.map((side, idx) => (
								<ItemDescription key={idx} description={side.name} />
							))}
						</div>
					)}
					{item.drinks && item.drinks.length > 0 && (
						<div className="mb-1.5">
							<ItemTitle title="vai querer bebida?" />

							{item.drinks.map((drink, idx) => {
								const drinkPrice = drink.value * drink.quantity

								return (
									<div key={idx} className="flex items-center mb-0.5">
										<ItemDescription description={drink.name} hasMr3={true} />
										<p className="font-bold text-xs text-[#00A296]">
											{formatPrice(drinkPrice)}
										</p>
									</div>
								)
							})}
						</div>
					)}
					{item.utensils && (
						<div className="mb-1.5">
							<ItemTitle title="extras" />
							<div className="flex items-center mb-0.5">
								<ItemDescription
									description={item.utensils.name}
									hasMr3={true}
								/>
								<p className="font-bold text-xs text-[#00A296]">
									{formatPrice(item.utensils.value)}
								</p>
							</div>
						</div>
					)}
					{item.extras && item.extras.length > 0 && (
						<div className="mb-1.5">
							<ItemTitle title="extras" />
							{item.extras.map((extra, idx) => {
								return (
									<div key={idx} className="flex items-center mb-0.5">
										<ItemDescription description={extra.name} hasMr3={true} />
										<p className="font-bold text-xs text-[#00A296]">
											{formatPrice(extra.value)}
										</p>
									</div>
								)
							})}
						</div>
					)}
					{storeDeliveryFee > 0 &&
						(!storeFreeDeliveryMinimum ||
							totalPrice(false) <= storeFreeDeliveryMinimum) && (
							<div className="mb-1.5">
								<ItemTitle title="frete" />

								<div className="flex items-center mb-0.5">
									<ItemDescription
										description="taxa de entrega"
										hasMr3={true}
									/>
									<p className="font-bold text-xs text-[#00A296]">
										{formatPrice(storeDeliveryFee)}
									</p>
								</div>
							</div>
						)}
					{item.observations && (
						<p className="text-xs mb-1.5 font-semibold bg-[#F5F6F9] rounded p-1.5">
							<span className="font-bold bg-[#F5F5F5] mr-1">observação:</span>
							{item.observations}
						</p>
					)}
				</div>
			</div>
		)
	})
}
