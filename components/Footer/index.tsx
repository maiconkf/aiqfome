import { IFooter } from './footer.interfaces'

export default function Footer({ showFooter }: IFooter) {
	if (!showFooter) return <></>

	return (
		<footer className="py-6 bg-[#EEF0F5] text-center">
			<div className="container mx-auto block md:flex md:items-center md:justify-between px-4 sm:px-0">
				<p className="font-bold text-[#580F78] text-sm mb-2 md:mb-0 xl">
					feito com 💜 em maringá-PR
				</p>
				<p className="font-bold text-[#580F78]">
					aiqfome.com © 2007-2023 aiqfome LTDA . CNPJ: 09.186.786/0001-58
				</p>
			</div>
		</footer>
	)
}
