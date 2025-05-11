import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartState } from './cart.interfaces'

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			storeId: null,
			storeName: null,
			storeImage: null,
			storeMinimunOrderValue: 0,

			addToCart: (
				newItem,
				storeId,
				storeName,
				storeImage,
				storeMinimunOrderValue
			) => {
				const { storeId: currentStore, items } = get()

				if (currentStore && currentStore !== storeId) {
					set({
						items: [newItem],
						storeId,
						storeName,
						storeImage,
						storeMinimunOrderValue,
					})
					return
				}

				const existingIndex = items.findIndex(
					item =>
						item.flavor?.slug === newItem.flavor?.slug &&
						item.size?.name === newItem.size?.name &&
						JSON.stringify(item.utensils) ===
							JSON.stringify(newItem.utensils) &&
						JSON.stringify(item.sides) === JSON.stringify(newItem.sides) &&
						JSON.stringify(item.drinks) === JSON.stringify(newItem.drinks)
				)

				if (existingIndex >= 0) {
					const updatedItems = [...items]
					updatedItems[existingIndex].quantity += newItem.quantity
					set({ items: updatedItems })
				} else {
					set({
						items: [...items, newItem],
						storeId,
						storeName,
						storeImage,
						storeMinimunOrderValue,
					})
				}
			},

			increaseQuantity: id => {
				set(state => {
					const updatedItems = state.items.map(item => {
						if (item.id === id) {
							return { ...item, quantity: item.quantity + 1 }
						}
						return item
					})

					return { items: updatedItems }
				})
			},

			decreaseQuantity: id => {
				set(state => {
					const updatedItems = state.items
						.map(item => {
							if (item.id === id) {
								return { ...item, quantity: Math.max(0, item.quantity - 1) }
							}
							return item
						})
						.filter(item => item.quantity > 0)

					return { items: updatedItems }
				})
			},

			updateCartItem: (itemId: string, updatedItem: CartItem) => {
				set(state => ({
					items: state.items.map(item =>
						item.id === itemId ? updatedItem : item
					),
				}))
			},

			removeFromCart: id =>
				set(state => ({
					items: state.items.filter(i => i.id !== id),
				})),

			totalPrice: () =>
				get().items.reduce((total, item) => {
					const basePrice = item.size
						? item.size.discount_price ?? item.size.full_price
						: item.discount_price ?? item.full_price

					const extras =
						item.extras?.reduce((sum, extra) => sum + (extra.value ?? 0), 0) ??
						0
					const drinks =
						item.drinks?.reduce(
							(sum, drink) => sum + (drink.value ?? 0) * drink.quantity,
							0
						) ?? 0
					const utensils = Array.isArray(item.utensils)
						? item.utensils.reduce((sum, ut) => sum + (ut.value ?? 0), 0)
						: item.utensils?.value ?? 0

					const itemTotal =
						(basePrice + extras + drinks + utensils) * item.quantity

					return total + itemTotal
				}, 0),
		}),
		{
			name: '@cart',
		}
	)
)
