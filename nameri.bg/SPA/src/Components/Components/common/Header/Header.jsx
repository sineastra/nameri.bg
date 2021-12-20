import styles from './Header.module.css'
import logoImg from '../../../../assets/images/n-letter-png-transparent-images-76708.svg'
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import { useContext, useEffect, useState } from "react"
import UserContext from "../../../Contexts/UserContext.jsx"
import UserHeader from "../../UserHeader/UserHeader.jsx"


const Header = () => {
	const [sideBarVisibility, setSideBarVisibility] = useState('hidden')
	const [windowWidth, setWindowWidth] = useState(0)

	const showSideBar = () => {
		setSideBarVisibility(oldState => oldState === 'hidden' ? 'visible' : 'hidden')
	}

	const handleResize = () => {
		setWindowWidth(window.innerWidth)

		if (window.innerWidth > 800) {
			setSideBarVisibility('hidden')
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const mobileSideBarClass = windowWidth <= 800 ? styles[sideBarVisibility] : styles.hidden

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
						<UserHeader className={ styles.userNavContainer }/>
						<div className={ styles.mobileNavIcon } onClick={ showSideBar }>
							<FaBars/>
						</div>
					</IconContext.Provider>
				</section>
			</nav>
			<aside className={ `${ styles.mobileNav } ${ mobileSideBarClass }` }>
				<button onClick={ showSideBar }>CLICK ME</button>
			</aside>
		</header>
	)
}

export default Header