import { BrowserRouter } from 'react-router-dom'
import AppWrapper from "./Components/Components/AppWrapper/AppWrapper.jsx"
import { Suspense } from "react"
import Spinner from "./Components/Components/Spinner/Spinner.jsx"


function App () {
	return (
		<BrowserRouter>
			<AppWrapper/>
		</BrowserRouter>
	)
}

export default App
