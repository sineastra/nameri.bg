import styles from './Header.module.css'
import logoImg from '../../../../assets/images/n-letter-png-transparent-images-76708.svg'
import { Link } from "react-router-dom"


const Header = () => {

	return (
		<header className={ styles.header }>
			<nav className={ styles.mainNav }>
				<section className={ `${ styles.logoContainer } ${ styles.leftNavCont }` }>
					<Link to="/" className={ styles.logoLink }>
						<img src={ logoImg } alt="LOGO" className={ styles.logoImg }/>
					</Link>
					<Link to={ '/categories' } className={ styles.mainNavLink }>Категории</Link>
					<Link to={ '/about' } className={ styles.mainNavLink }>За Платформата</Link>
					<Link to={ '/top-users' } className={ styles.mainNavLink }>Топ Потребители</Link>
				</section>
				<section className={ `${ styles.logoContainer } ${ styles.rightNavCont }` }>
					<Link to={ '/sign-in' } className={ `${ styles.mainNavLink } ${ styles.black }` }>Влез</Link>
				</section>
			</nav>
		</header>
	)
}

export default Header