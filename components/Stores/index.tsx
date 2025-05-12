import Store from '../Store'
import storesData from '@/app/data/stores.json'
import { IStore } from '../Store/store.interfaces'
import { isStoreClosed } from '@/utils'

export default function Stores() {
	const openStores = storesData.stores.filter(
		(store: IStore) => !isStoreClosed(store.business_hours)
	)

	console.log('openStores', openStores)

	const closedStores = storesData.stores.filter((store: IStore) =>
		isStoreClosed(store.business_hours)
	)

	console.log('closedStores', closedStores)

	return (
		<section className="py-6 px-4 xl:px-0">
			{openStores.length > 0 && (
				<>
					<h1 className="text-[#7B1FA2] font-extrabold text-xl">abertos</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
						{openStores.map((store: IStore) => (
							<Store key={store.id} store={store} isClosed={false} />
						))}
					</div>
				</>
			)}

			{closedStores.length > 0 && (
				<>
					<h2 className="text-[#7B1FA2] font-extrabold text-xl mt-8">
						fechados
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
						{closedStores.map((store: IStore) => (
							<Store key={store.id} store={store} isClosed={true} />
						))}
					</div>
				</>
			)}
		</section>
	)
}
