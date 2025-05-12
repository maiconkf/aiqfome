import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ICartItem, ICartState } from './cart.interfaces'

export const useCartStore = create<ICartState>()(
	persist(
		(set, get) => ({
			items: [],
			store: null,

			addToCart: (newItem, newStore) => {
				const { store: currentStore, items } = get()

				if (currentStore && currentStore.id !== newStore.id) {
					set({
						items: [newItem],
						store: newStore,
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
						store: newStore,
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

			updateCartItem: (itemId: string, updatedItem: ICartItem) => {
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

			totalPrice: (includeDeliveryFee = true) => {
				const { items, store } = get()

				const itemsTotal = items.reduce((total, item) => {
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

					const utensils = item.utensils?.value ?? 0

					const itemTotal =
						basePrice * item.quantity + extras + drinks + utensils

					return total + itemTotal
				}, 0)

				if (!includeDeliveryFee) {
					return itemsTotal
				}

				if (
					store &&
					store.free_delivery_minimun !== null &&
					itemsTotal >= store.free_delivery_minimun
				) {
					return itemsTotal
				}

				return itemsTotal + (store?.delivery_fee ?? 0)
			},
		}),
		{
			name: '@cart',
		}
	)
)
