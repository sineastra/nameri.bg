import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"
import { useEffect } from "react"


const MainPageLayout = ({ children }) => {

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	return (
		<>
			<Header/>
			<div style={ { minHeight: '70vh' } }>
				{ children }
			</div>
			<Footer/>
		</>
	)
}

export default MainPageLayout