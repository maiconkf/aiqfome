'use client'

import { useParams } from 'next/navigation'
import productsData from '@/app/data/products.json'
import storesData from '@/app/data/stores.json'
import { IStore } from '@/components/Store/store.interfaces'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { formatPrice, isStoreClosed } from '@/utils'
import Menu from '@/components/Menu'

export default function StorePage() {
	const { estabelecimento } = useParams()
	const storeId = String(estabelecimento)

	const storeProduct =
		productsData.products[storeId as keyof typeof productsData.products]

	const storeData: IStore | undefined = storesData.stores.find(
		store => store.id === storeId
	)

	if (!storeProduct || !storeData) {
		return (
			<Layout showSearch={false} showFooter={true}>
				<div className="container mx-auto px-4 sm:px-0">
					<h1 className="py-4 text-[#6D6F73]">
						Estabelecimento não encontrado.
					</h1>
				</div>
			</Layout>
		)
	}

	const {
		logo,
		name,
		delivery_fee,
		delivery_time,
		distance_km,
		free_delivery_minimum,
		rating,
		business_hours,
		minimum_order_value,
	} = storeData

	const isClosed = isStoreClosed(business_hours)

	const { items } = storeProduct

	return (
		<Layout showSearch={false} showFooter={true}>
			<main className="pb-19">
				<div className="container mx-auto py-6 px-4 md:px-0">
					<div className="flex items-center mb-2">
						<Image
							src={logo}
							width={36}
							height={36}
							alt={name}
							className="border border-solid border-[#EEF0F5] rounded-sm"
						/>
						<h1 className="ml-2 font-extrabold text-xl text-[#202326]">
							{name}
						</h1>
					</div>
					<div className="flex items-center justify-between mb-1.5">
						<div className="flex items-center">
							<button className="p-2 mr-3 cursor-pointer">
								<Image
									src="/icons/share.svg"
									width={16}
									height={18}
									alt="Compartilhar"
								/>
							</button>
							<button className="p-2 mr-3 cursor-pointer">
								<Image
									src="/icons/heart.svg"
									width={18}
									height={16}
									alt="Favoritar"
								/>
							</button>
						</div>
						<button className="flex items-center py-1 px-0.5 cursor-pointer">
							<span className=" text-[#00A296] font-bold text-xs mr-1.5">
								mais infos
							</span>
							<Image
								src="/icons/chevron-right-green.svg"
								width={4}
								height={6}
								alt="Acessar informações"
							/>
						</button>
					</div>
					<div className="flex items-center mb-1">
						<button className="flex items-center cursor-pointer px-0.5 py-1.5">
							{delivery_fee ? (
								<Image
									src="/icons/aiqentrega.svg"
									width={18}
									height={18}
									alt="Entrega do aiqfome"
								/>
							) : (
								<Image
									src="/icons/motorcycle.svg"
									width={18}
									height={13}
									alt="Moto"
								/>
							)}
							<p
								className={`font-bold text-sm ml-2 mr-1.5 ${
									delivery_fee ? 'text-[#7B1FA2]' : 'text-[#027A7A]'
								}`}
							>
								{delivery_fee ? formatPrice(delivery_fee) : 'grátis'}
							</p>
							<Image
								src={
									delivery_fee
										? '/icons/chevron-right-purple.svg'
										: '/icons/chevron-right-green.svg'
								}
								width={4}
								height={6}
								alt="Ver mais"
							/>
						</button>
						<span className="font-bold text-xs text-[#A8ADB7] mx-1.5">•</span>
						<span className="font-bold text-xs text-[#A8ADB7]">
							hoje, {delivery_time}
						</span>
						<span className="font-bold text-xs text-[#A8ADB7] mx-1.5">•</span>
						<span className="font-bold text-xs text-[#A8ADB7]">
							{distance_km}km
						</span>
					</div>
					{free_delivery_minimum && (
						<p className="font-bold text-xs text-[#027A7A] bg-[#F2FAFA] py-1.5 px-2 rounded-md inline-block mb-1">
							entrega grátis acima de {formatPrice(free_delivery_minimum)}
						</p>
					)}
					<div className="flex items-center mb-1">
						<button className="flex items-center px-0.5 py-1.5 cursor-pointer">
							<Image
								src="/icons/star.svg"
								width={12}
								height={12}
								alt="Avaliações"
							/>
							<span className="text-xs font-bold ml-2 mr-1 text-[#6D6F73]">
								{rating} de 5
							</span>
							<Image
								src="/icons/chevron-right-gray.svg"
								width={4}
								height={6}
								alt="Ver avaliações"
							/>
						</button>
						<span className="font-bold text-xs text-[#A8ADB7] mx-1.5">•</span>
						<p
							className={`text-xs font-bold ${
								isClosed ? 'text-red-500' : 'text-[#02A117]'
							}`}
						>
							{isClosed ? 'fechado' : `fecha às ${business_hours.closing}`}
						</p>
					</div>
					{minimum_order_value && (
						<p className="text-xs font-bold text-[#6D6F73]">
							pedido mínimo: {formatPrice(minimum_order_value)}
						</p>
					)}
				</div>
				{items.map((item, idx) => (
					<Menu key={idx} product={item} isStoreClosed={isClosed} />
				))}
			</main>
		</Layout>
	)
}
