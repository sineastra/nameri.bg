import { BrowserRouter } from 'react-router-dom'
import AppWrapper from "./Components/Components/AppWrapper/AppWrapper.jsx"
import ErrorBoundary from "./Components/Components/ErrorBoundary/ErrorBoundary.jsx"


function App () {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<AppWrapper/>
			</ErrorBoundary>
		</BrowserRouter>
	)
}

export default App
