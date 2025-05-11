import Banner from '@/components/Banner'
import Layout from '@/components/Layout'
import Stores from '@/components/Stores'

export default function Home() {
	return (
		<Layout showSearch={true} showFooter={true}>
			<div className="container mx-auto">
				<hr className="text-white" />
				<Banner />
				<Stores />
			</div>
		</Layout>
	)
}
