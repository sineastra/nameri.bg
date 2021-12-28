import styles from './Header.module.css'
import logoImg from '../../../../assets/images/n-letter-png-transparent-images-76708.svg'
import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import { useContext, useEffect, useState } from "react"
import UserHeader from "../../UserHeader/UserHeader.jsx"
import SideNav from "../SideNav/SideNav.jsx"
import UserContext from "../../../Contexts/UserContext.jsx"
import userServices from "../../../../services/userServices.js"
import Cookies from "js-cookie"
import extractErrorMessages from "../../../../helpers/extractErrorMessages.js"
import SoftErrorsContext from "../../../Contexts/SoftErrorsContext.jsx"


const Header = () => {
	const navigate = useNavigate()
	const [, setErrors] = useContext(SoftErrorsContext)
	const [user, setUser] = useContext(UserContext)
	const [sideBarVisibility, setSideBarVisibility] = useState('hidden')
	const [windowWidth, setWindowWidth] = useState(0)

	const toggleSideBar = () => {
		setSideBarVisibility(oldState => oldState === 'hidden' ? 'visible' : 'hidden')
	}

	const handleResize = () => {
		setWindowWidth(window.innerWidth)

		if (window.innerWidth > 800) {
			setSideBarVisibility('hidden')
		}
	}

	const logout = async () => {
		try {
			const response = await userServices.logout()

			if (response.ok) {
				Cookies.remove(process.env.REACT_APP_JWT_COOKIE_NAME)
				setUser(null)
				navigate("/")
			} else {
				setErrors(extractErrorMessages(response.errors))
			}
		} catch (e) {
			navigate("/error", {
				state: {
					statusCode: e.statusCode, status: e.status, msg: e,
				},
			})
		}

	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const visibilityClassName = windowWidth <= 800 ? styles[sideBarVisibility] : styles.hidden

	return (
		<header className={ styles.header }>
			<nav className={ styles.mainNav }>
				<section className={ styles.logoContainer }>
					<Link to="/" className={ styles.logoLink }>
						<img src={ logoImg } alt="LOGO" className={ styles.logoImg }/>
					</Link>
				</section>
				<section className={ ` ${ styles.leftNavCont }` }>
					<Link to={ '/categories' } className={ styles.mainNavLink }>Категории</Link>
					<Link to={ '/about' } className={ styles.mainNavLink }>За Платформата</Link>
					<Link to={ '/top-users' } className={ styles.mainNavLink }>Топ Потребители</Link>
				</section>
				<section className={ styles.rightNavCont }>
					<IconContext.Provider value={ { size: '2em', color: 'lightgray' } }>
						<UserHeader
							className={ styles.userNavContainer }
							user={ user }
							setUser={ setUser }
							logout={ logout }
						/>
						<div className={ styles.mobileNavIcon } onClick={ toggleSideBar }>
							<FaBars/>
						</div>
					</IconContext.Provider>
				</section>
			</nav>
			<aside className={ `${ styles.mobileNav } ${ visibilityClassName }` }>
				<SideNav
					toggleSideBar={ toggleSideBar }
					user={ user }
					setUser={ setUser }
					logout={ logout }
				/>
			</aside>
		</header>
	)
}

export default Header