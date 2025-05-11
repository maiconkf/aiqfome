import Image from 'next/image'

export default function Search() {
	return (
		<form className="flex items-center bg-white rounded-lg mt-4 border border-solid border-[#CDD1D9] py-2 pl-3 pr-4">
			<button type="submit" className="p-1 mr-2 cursor-pointer">
				<Image src="/icons/search.svg" width={16} height={16} alt="Pesquisar" />
			</button>
			<input
				type="search"
				placeholder="busque pela loja ou culinária"
				className="font-semibold text-[#6D6F73] text-sm w-full outline-0"
			/>
		</form>
	)
}
