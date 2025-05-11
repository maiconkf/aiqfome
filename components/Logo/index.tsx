import Image from 'next/image'

export default function Logo() {
	return (
		<Image
			src="/images/aiqfome-logo.svg"
			width={32}
			height={32}
			alt="Logotipo do aiqfome"
		/>
	)
}
