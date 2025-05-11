const handleItemMenuStoreClosed = (e: React.MouseEvent<HTMLDivElement>) => {
	e.stopPropagation()

	alert('Loja fechada! Você só pode visualizar o cardápio.')
}
