'use client'

import Layout from '@/components/Layout'
import { useParams, useRouter } from 'next/navigation'
import productsData from '@/app/data/products.json'
import storesData from '@/app/data/stores.json'
import {
	IFlavor,
	IFlavorSize,
	ISideOption,
	IExtraOption,
} from '../../estabelecimento.interfaces'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import DrinksSection from './components/Drinks'
import SidesSection from './components/Sides'
import ProductSection from './components/Product'
import QuantitiesSection from './components/Quantities'
import SizesSection from './components/Sizes'
import UtensilsSession from './components/Utensils'
import ExtrasSection from './components/Extras'
import ObservationsSession from './components/Observations'
import Link from 'next/link'
import { CartItem } from '@/store/cart/cart.interfaces'
import LoadingSpinner from '@/components/LoadingSpinner'
import { isStoreClosed } from '@/utils/store'

export default function ProductPage() {
	const { estabelecimento, produto } = useParams()
	const router = useRouter()
	const storeId = estabelecimento ? String(estabelecimento) : ''
	const slug = produto ? String(produto) : ''

	const storeData = storeId
		? productsData.products[storeId as keyof typeof productsData.products]
		: undefined

	const storeInfo = storesData.stores.find(store => store.id === storeId)

	useEffect(() => {
		if (storeInfo && isStoreClosed(storeInfo.business_hours)) {
			alert('Esta loja está fechada no momento!')
			router.push(`/estabelecimento/${storeId}`)
		}
	}, [storeInfo, storeId, router])

	const { updateCartItem, items } = useCartStore()

	const [selectedSize, setSelectedSize] = useState<IFlavorSize | null>(null)
	const [targetFlavor, setTargetFlavor] = useState<IFlavor | undefined>(
		undefined
	)
	const [itemInCart, setItemInCart] = useState<CartItem | undefined>(undefined)
	const [selectedSides, setSelectedSides] = useState<ISideOption[]>([])
	const [sidesError, setSidesError] = useState<string>('')
	const [selectedExtras, setSelectedExtras] = useState<IExtraOption[]>([])
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		if (!estabelecimento || !produto || !storeData) return

		let flavor: IFlavor | undefined

		for (const item of storeData.items) {
			const foundFlavor = item.flavors.find(f => f.slug === slug)
			if (foundFlavor) {
				flavor = foundFlavor
				break
			}
		}

		setTargetFlavor(flavor)
	}, [estabelecimento, produto, storeData, slug])

	useEffect(() => {
		if (!targetFlavor) return

		const foundItemInCart = items.find(
			(item: CartItem) => item?.flavor?.slug === targetFlavor.slug
		)

		if (JSON.stringify(foundItemInCart) !== JSON.stringify(itemInCart)) {
			setItemInCart(foundItemInCart)
		}
	}, [targetFlavor, items, itemInCart])

	useEffect(() => {
		if (!storeData) return

		if (itemInCart && itemInCart.extras) {
			setSelectedExtras(itemInCart.extras)
		} else {
			setSelectedExtras([])
		}

		if (itemInCart && itemInCart.sides) {
			setSelectedSides(itemInCart.sides)
		} else if (
			storeData.sides &&
			storeData.sides.required &&
			(!itemInCart || !itemInCart.sides || itemInCart.sides.length === 0)
		) {
			setSelectedSides([])
		}
	}, [itemInCart, storeData])

	useEffect(() => {
		if (!targetFlavor) return

		if (itemInCart) {
			if (itemInCart.size) {
				setSelectedSize(itemInCart.size)
			} else if (targetFlavor.sizes && targetFlavor.sizes.length > 0) {
				setSelectedSize(targetFlavor.sizes[0])
			}
		} else {
			if (targetFlavor.sizes && targetFlavor.sizes.length > 0) {
				setSelectedSize(targetFlavor.sizes[0])
			}
		}
	}, [itemInCart, targetFlavor])

	if (!estabelecimento || !produto) {
		return (
			<Layout showSearch={false} showFooter={true}>
				<div className="container mx-auto py-4 h-full flex items-center justify-center">
					<LoadingSpinner />
				</div>
			</Layout>
		)
	}

	if (!storeData) {
		return (
			<Layout showSearch={false} showFooter={true}>
				<div className="container mx-auto py-4 px-4 sm:px-0">
					<h1>Estabelecimento não encontrado</h1>
				</div>
			</Layout>
		)
	}

	if (!targetFlavor) {
		return (
			<Layout showSearch={false} showFooter={true}>
				<div className="container mx-auto py-4 px-4 sm:px-0">
					<h1>Produto não encontrado</h1>
				</div>
			</Layout>
		)
	}

	const { sides, drinks, extras } = storeData

	const {
		image,
		name,
		sizes,
		discount_price,
		full_price,
		description,
		utensils,
		isDrinkOrDessert,
	} = targetFlavor

	const minimunPrice = sizes
		? sizes[0].discount_price ?? sizes[0].full_price
		: discount_price ?? full_price ?? 0

	const handleSizeChange = (size: IFlavorSize) => {
		setSelectedSize(size)

		if (itemInCart) {
			updateCartItem(itemInCart.id, {
				...itemInCart,
				size: size,
			})
		}
	}

	return (
		<Layout showSearch={false} showFooter={true}>
			<ProductSection
				image={image}
				name={name}
				minimunPrice={minimunPrice}
				description={description}
			/>
			<QuantitiesSection
				selectedSides={selectedSides}
				storeId={storeId}
				itemInCart={itemInCart}
				selectedSize={selectedSize}
				targetFlavor={targetFlavor}
				isDrinkOrDessert={isDrinkOrDessert}
				sides={sides}
				quantity={quantity}
				setQuantity={setQuantity}
				setSelectedSides={setSelectedSides}
			/>
			{sizes && !isDrinkOrDessert && (
				<SizesSection
					targetFlavor={targetFlavor}
					handleSizeChange={handleSizeChange}
					selectedSize={selectedSize}
				/>
			)}
			{sides && !isDrinkOrDessert && (
				<SidesSection
					targetFlavor={targetFlavor}
					sides={sides}
					selectedSides={selectedSides}
					setSelectedSides={setSelectedSides}
					itemInCart={itemInCart}
					updateCartItem={updateCartItem}
					setSidesError={setSidesError}
					sidesError={sidesError}
					estabelecimento={estabelecimento as string}
					produto={produto as string}
					isDrinkOrDessert={isDrinkOrDessert}
					storeId={storeId}
					quantity={quantity}
					setQuantity={setQuantity}
					selectedSize={selectedSize}
				/>
			)}
			{drinks && !isDrinkOrDessert && (
				<DrinksSection
					drinks={drinks}
					initialDrinks={itemInCart?.drinks}
					itemInCart={itemInCart}
				/>
			)}
			{utensils && utensils.length > 0 && !isDrinkOrDessert && (
				<UtensilsSession
					utensils={utensils}
					itemInCart={itemInCart}
					targetFlavor={targetFlavor}
					selectedSize={selectedSize}
					selectedSides={selectedSides}
					sides={sides}
					storeId={storeId}
					setSidesError={setSidesError}
				/>
			)}
			{extras && !isDrinkOrDessert && (
				<ExtrasSection
					extras={extras}
					selectedExtras={selectedExtras}
					setSelectedExtras={setSelectedExtras}
					itemInCart={itemInCart}
					updateCartItem={updateCartItem}
				/>
			)}
			<ObservationsSession itemInCart={itemInCart} />
			{(!sides ||
				!sides.required ||
				(selectedSides.length > 0 && quantity > 0) ||
				(itemInCart && (itemInCart.sides || isDrinkOrDessert))) && (
				<Link
					href="/carrinho"
					className="bg-[#7B1FA2] rounded-lg w-full max-w-[342px] h-[48px] fixed bottom-4 left-1/2 -translate-x-1/2 text-center leading-[48px] text-white font-bold"
				>
					ver ticket
				</Link>
			)}
		</Layout>
	)
}
