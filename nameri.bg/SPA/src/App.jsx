import { BrowserRouter } from 'react-router-dom'
import AppWrapper from "./Components/Components/AppWrapper/AppWrapper.jsx"


function App () {
	console.log(document.cookie)

	return (
		<BrowserRouter>
			<AppWrapper/>
		</BrowserRouter>
	)
}

export default App
