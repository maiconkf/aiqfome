import Image from 'next/image'

export default function Address() {
	return (
		<div className="flex items-center ml-6">
			<Image src="/icons/pin.svg" width={13} height={16} alt="Localização" />
			<div className="ml-4">
				<p className="text-[#EECFFC] mb-0.5 font-bold text-sm/4.75">
					entregando em
				</p>
				<button className="flex items-center text-white font-bold leading-5.5 cursor-pointer text-left">
					<span className="flex items-center flex-wrap mr-2">
						<span className="truncate max-w-42 inline-block">
							Rua Mandaguari
						</span>
						, 198
					</span>
					<Image
						src="/icons/chevron-right.svg"
						width={6}
						height={10}
						alt="Acessar"
					/>
				</button>
			</div>
		</div>
	)
}
