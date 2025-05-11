import Image from 'next/image'
import { IMenu } from './menu.interfaces'
import { MouseEvent, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Submenu from './Submenu'

export default function Menu({ product, isStoreClosed }: IMenu) {
	const [isOpen, setIsOpen] = useState(false)
	const { estabelecimento } = useParams()

	const handleItemMenuStoreClosed = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()

		alert('Loja fechada! Você só pode visualizar o cardápio.')
	}

	return (
		<div
			className="border-b-4 border-solid border-[#EEF0F5] px-4"
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className="container mx-auto py-4 flex items-center justify-between cursor-pointer">
				<div className="flex items-center">
					<h2 className="font-bold text-[#202326] mr-2">{product.name}</h2>
					{product.money_icon && (
						<Image
							src="/icons/money.svg"
							width={18}
							height={18}
							alt="Promoção"
						/>
					)}
				</div>
				<Image
					src="/icons/chevron-down.svg"
					width={8}
					height={14}
					alt="Abrir categoria"
					className={`transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</div>
			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden transform-gpu container mx-auto ${
					isOpen
						? 'max-h-[500px] opacity-100 scale-y-100'
						: 'max-h-0 opacity-0 scale-y-95'
				}`}
			>
				<div className="pb-4">
					<p className="text-sm font-semibold text-[#6D6F73]">
						{product.description}
					</p>
				</div>
				{product.flavors?.map((flavor, idx) =>
					isStoreClosed ? (
						<div
							key={idx}
							className="flex items-center justify-between pt-2 px-2 pb-4"
							onClick={e => handleItemMenuStoreClosed(e)}
						>
							<Submenu flavor={flavor} />
						</div>
					) : (
						<Link
							href={`/estabelecimento/${estabelecimento}/produto/${flavor.slug}`}
							key={idx}
							className="flex items-center justify-between pt-2 px-2 pb-4"
						>
							<Submenu flavor={flavor} />
						</Link>
					)
				)}
			</div>
		</div>
	)
}
