import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"


const MainPageLayout = ({ children }) => {

	return (
		<>
			<Header/>
			{children}
			<Footer/>
		</>
	)
}

export default MainPageLayout