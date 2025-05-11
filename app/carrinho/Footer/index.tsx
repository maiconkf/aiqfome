import ErrorMessage from '@/components/ErrorMessage'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/utils'

export default function FooterCart() {
	const { storeMinimunOrderValue, totalPrice } = useCartStore()

	return (
		<footer className="fixed bottom-0 left-0 w-full p-4 shadow-[0_0_15px_0_rgba(0,0,0,0.15)] bg-white">
			<div className="container mx-auto px-2">
				<div className="flex items-center justify-between flex-wrap">
					<div className="mr-7">
						<p className="text-[#202326] font-bold text-sm mb-0.5">subtotal</p>
						<p className="text-[#7B1FA2] font-extrabold text-xl">
							{formatPrice(totalPrice())}
						</p>
					</div>
					{storeMinimunOrderValue <= totalPrice(false) ? (
						<button
							className="bg-[#7B1FA2] rounded-lg text-white text-sm font-bold px-10 py-3.5 cursor-pointer touch-manipulation"
							onClick={() => alert('Página em construção')}
						>
							ir para pagamento
						</button>
					) : (
						<ErrorMessage
							error={`O valor mínimo do pedido deve ser de ${formatPrice(
								storeMinimunOrderValue
							)}`}
						/>
					)}
				</div>
			</div>
		</footer>
	)
}
