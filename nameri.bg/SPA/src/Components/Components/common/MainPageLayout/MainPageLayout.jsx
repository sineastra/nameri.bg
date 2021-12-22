import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"
import { useLocation } from "react-router-dom"


const MainPageLayout = ({ children }) => {
	const location = useLocation()
	const allowedRoutes = ["/", ]

	return (
		location.pathname === '/have-fun' ? children : <><Header/>{ children }<Footer/></>
	)
}

export default MainPageLayout