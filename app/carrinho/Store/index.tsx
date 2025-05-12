import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function StoreCart() {
	const { store } = useCartStore()

	return store?.name && store.image ? (
		<div className="container mx-auto px-4 sm:px-0">
			<Link href={`/estabelecimento/${store.id}`} className="flex items-center">
				<Image
					src={store.image}
					alt={store.name}
					width={32}
					height={32}
					className="rounded mr-2"
				/>
				<div>
					<p className="text-sm text-[#6D6F73] mb-1 font-bold">seus itens em</p>
					<h1 className="font-bold text-[#202326]">{store.name}</h1>
				</div>
			</Link>
		</div>
	) : (
		<></>
	)
}
