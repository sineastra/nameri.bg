import { FaGithub, FaLinkedin, FaFacebookF } from "react-icons/fa"
import { Link } from "react-router-dom"
import sineastraLogo from "../../../../assets/images/letter-s-between-straight-parenthesis-symbol.svg"
import styles from './Footer.module.css'
import { IconContext } from "react-icons"
import StyledBtn from "../../StyledLinkBtn/StyledBtn.jsx"


const Footer = () => {
	return (
		<footer className={ styles.mainFooter }>
			<section className={ styles.footerSection }>
				<img src={ sineastraLogo }
				     alt="Sineastra Personal Logo"
				     className={ styles.footerLogo }/>
				<section className={ styles.socialIconHolder }>
					<IconContext.Provider value={ { color: 'black', size: '1.5em' } }>
						<a href="https://github.com/Sineastra">
							<FaGithub/>
						</a>
						<a href="https://www.linkedin.com/in/orfey-kostadinov-a152131b6">
							<FaLinkedin/>
						</a>
						<a href="https://github.com/Sineastra">
							<FaFacebookF/>
						</a>
					</IconContext.Provider>
				</section>
			</section>
			<section className={ styles.footerSection }>
				<h5 className={ styles.categoriesHeading }>Категории</h5>
				<Link to="/services/auto" className={ styles.footerLink }>Авто услуги</Link>
				<Link to="/services/digital" className={ styles.footerLink }>Дигитални услуги</Link>
				<Link to="services/masters" className={ styles.footerLink }>Занаятчии</Link>
				<Link to="/services/health" className={ styles.footerLink }>Здраве и красота</Link>
				<Link to="/services/social" className={ styles.footerLink }>Образователни и социални дейности</Link>
			</section>
			<section className={ styles.footerSection }>
				<h5 className={ styles.footerSmallHeader }>Условия на платформата</h5>
				<h5 className={ styles.footerSmallHeader }>За платформата</h5>
				<h5 className={ styles.footerSmallHeader }>Промо обяви</h5>
				<h5 className={ styles.footerSmallHeader }>Въпроси</h5>
			</section>
			<section className={ styles.footerSection }>
				<StyledBtn href="/sign-up" text="Регистрирай се" className={ styles.styledBtnClass }/>
				<StyledBtn href="/categories" text="Виж обявите" className={ styles.styledBtnClass }/>
			</section>
		</footer>
	)
}

export default Footer