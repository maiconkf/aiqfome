import Footer from '../Footer'
import Header from '../Header'
import { ILayout } from './layout.interfaces'

export default function Layout({ showSearch, showFooter, children }: ILayout) {
	return (
		<div className="h-full flex flex-col justify-between ">
			<div>
				<Header showSearch={showSearch} />
				{children}
			</div>
			<Footer showFooter={showFooter} />
		</div>
	)
}
