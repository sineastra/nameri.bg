import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"


const MainPageLayout = ({ children }) => {


	return (
		<>
			<Header/>
			<div style={ { minHeight: '80vh' } }>
				{ children }
			</div>
			<Footer/>
		</>
	)
}

export default MainPageLayout