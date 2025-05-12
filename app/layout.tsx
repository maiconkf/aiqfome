import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'aiqfome',
	description: 'Sua plataforma de delivery favorita',
	icons: {
		icon: [
			{ url: '/favicon.ico', type: 'image/x-icon', sizes: '48x48' },
			{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
			{ url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
		other: [
			{
				rel: 'android-chrome',
				url: '/android-chrome-192x192.png',
				sizes: '192x192',
			},
			{
				rel: 'android-chrome',
				url: '/android-chrome-512x512.png',
				sizes: '512x512',
			},
		],
	},
	manifest: '/manifest.json',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'aiqfome',
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
