import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'AIQFome',
	description: 'Sua plataforma de delivery favorita',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.png', type: 'image/png', sizes: '32x32' },
			{ url: '/icon-16.png', type: 'image/png', sizes: '16x16' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
		other: [
			{
				rel: 'mask-icon',
				url: '/safari-pinned-tab.svg',
				color: '#5bbad5',
			},
		],
	},
	manifest: '/manifest.json',
	themeColor: '#ffffff',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'AIQFome',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" className="h-full">
			<body className={`${nunito.variable} antialiased h-full`}>
				{children}
			</body>
		</html>
	)
}
