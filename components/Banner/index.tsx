import Image from 'next/image'

export default function Banner() {
	return (
		<Image
			src="https://placehold.co/1280x130.png"
			width={1280}
			height={130}
			alt="Banner"
			className="w-full object-cover h-[130]"
		/>
	)
}
