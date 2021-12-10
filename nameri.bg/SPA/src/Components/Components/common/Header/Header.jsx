import styles from './Header.module.css'
import logoImg from '../../../../assets/images/n-letter-png-transparent-images-76708.svg'
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import { useState } from "react"


const Header = () => {
	const [sideBarVisibility, setSideBarVisibility] = useState(false)

	const showSideBar = () => {
		setSideBarVisibility(oldState => !oldState)
	}

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
						<div className={ styles.userNavContainer }>
							<Link to={ '/sign-in' }
							      className={ `${ styles.mainNavLink } ${ styles.black }` }>Влез</Link>
						</div>
						<div className={ styles.mobileNavIcon } onClick={ showSideBar }>
							<FaBars/>
						</div>
					</IconContext.Provider>
				</section>
			</nav>
			<aside className={styles.mobileNav}>

			</aside>
		</header>
	)
}

export default Header