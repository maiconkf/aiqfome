import { IErrorMessage } from './errormessage.interfaces'

export default function ErrorMessage({ error }: IErrorMessage) {
	return (
		<p className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-sm inline-block">
			{error}
		</p>
	)
}
