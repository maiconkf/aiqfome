import Image from 'next/image'
import { IStoreProps } from './store.interfaces'
import Link from 'next/link'
import { formatPrice } from '@/utils'

export default function Store({ store, isClosed }: IStoreProps) {
	const { delivery_fee, name, rating, logo, id } = store

	return (
		<Link
			href={`/estabelecimento/${id}`}
			passHref
			className="flex items-center bg-[#F5F6F9] rounded-lg"
		>
			<div
				className={`flex items-center justify-center border border-solid border-[#EEF0F5] rounded-tl-lg rounded-bl-lg overflow-hidden ${
					isClosed ? 'opacity-40' : ''
				}`}
			>
				<Image src={logo} width={72} height={72} alt={name} />
			</div>

			<div className={isClosed ? 'px-3 pt-3 pb-2' : 'p-3'}>
				<h2 className="font-bold text-lg text-[#393A3C] mb-1">{name}</h2>
				<div className="flex items-center">
					<div className="px-0.75">
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
					</div>
					<p
						className={`font-bold text-sm ml-0.5 mr-1 ${
							delivery_fee ? 'text-[#7B1FA2]' : 'text-[#027A7A]'
						}`}
					>
						{delivery_fee ? formatPrice(delivery_fee) : 'grátis'}
					</p>
					<div className="p-0.75 mr-0.5">
						<Image src="/icons/star.svg" width={18} height={18} alt="Estrela" />
					</div>
					<p className="text-[#6D6F73] font-bold text-sm">{rating}</p>
				</div>
			</div>
		</Link>
	)
}
