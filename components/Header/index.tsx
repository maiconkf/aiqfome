import Image from 'next/image'
import { IHeader } from './header.interfaces'
import Logo from '../Logo'
import Address from './Address'
import Search from './Search'
import Link from 'next/link'

export default function Header({ showSearch }: IHeader) {
	return (
		<header className="sticky top-0 z-50 bg-[#7B1FA2]">
			<div className="p-4">
				<div className="container mx-auto">
					<div className="flex justify-between items-center">
						<div className="flex items-center mr-4">
							<Link href="/" passHref>
								<Logo />
							</Link>
							<Address />
						</div>
						<button className="px-1 py-0.75 cursor-pointer">
							<Image
								src="/icons/user.svg"
								width={16}
								height={18}
								alt="Usuário"
							/>
						</button>
					</div>
					{showSearch && <Search />}
				</div>
			</div>
		</header>
	)
}
