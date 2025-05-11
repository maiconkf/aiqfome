'use client'

import Layout from '@/components/Layout'
import { useCartStore } from '@/store/cart'
import FooterCart from './Footer'
import StoreCart from './Store'
import ItemCart from './Item'

export default function CartPage() {
	const { items } = useCartStore()

	return (
		<Layout showSearch={false} showFooter={false}>
			<section className="pt-6 pb-31">
				<StoreCart />

				{items.length === 0 ? (
					<div className="container mx-auto px-4 sm:px-0">
						<p className="text-[#6D6F73]">Seu carrinho está vazio</p>
					</div>
				) : (
					<>
						<ItemCart items={items} />
						<FooterCart />
					</>
				)}
			</section>
		</Layout>
	)
}
