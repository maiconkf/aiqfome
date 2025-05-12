export const scrollToSession = (id: string) => {
	const section = document.getElementById(id)

	if (section) {
		const headerHeight = 75
		const sectionPosition = section.getBoundingClientRect().top
		const offsetPosition = sectionPosition + window.pageYOffset - headerHeight

		setTimeout(
			() =>
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				}),
			500
		)
	}
}
