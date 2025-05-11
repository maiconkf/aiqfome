import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function StoreCart() {
	const { storeId, storeImage, storeName } = useCartStore()

	return storeName && storeImage ? (
		<div className="container mx-auto px-4 sm:px-0">
			<Link href={`/estabelecimento/${storeId}`} className="flex items-center">
				<Image
					src={storeImage}
					alt={storeName}
					width={32}
					height={32}
					className="rounded mr-2"
				/>
				<div>
					<p className="text-sm text-[#6D6F73] mb-1 font-bold">seus itens em</p>
					<h1 className="font-bold text-[#202326]">{storeName}</h1>
				</div>
			</Link>
		</div>
	) : (
		<></>
	)
}
