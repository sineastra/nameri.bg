import { FaGithub, FaLinkedin, FaFacebookF } from "react-icons/fa"
import { Link } from "react-router-dom"
import sineastraLogo from "../../../../assets/images/letter-s-between-straight-parenthesis-symbol.svg"
import styles from './Footer.module.css'
import { IconContext } from "react-icons"
import StyledLinkBtn from "../../StyledLinkBtn/StyledLinkBtn.jsx"


const Footer = () => {
	return (
		<footer className={styles.mainFooter}>
			<section className={styles.footerSection}>
				<img src={sineastraLogo}
				     alt="Sineastra Personal Logo"
				     className={styles.footerLogo}/>
				<section className={styles.socialIconHolder}>
					<IconContext.Provider value={{ color: 'black', size: '1.5em' }}>
						<Link to="https://github.com/Sineastra">
							<FaGithub/>
						</Link>
						<Link to="https://www.linkedin.com/in/orfey-kostadinov-a152131b6">
							<FaLinkedin/>
						</Link>
						<Link to="https://github.com/Sineastra">
							<FaFacebookF/>
						</Link>
					</IconContext.Provider>
				</section>
			</section>
			<section className={styles.footerSection}>
				<h5 className={styles.categoriesHeading}>Категории</h5>
				<Link to="/services/auto" className={styles.footerLink}>Авто услуги</Link>
				<Link to="/services/digital" className={styles.footerLink}>Дигитални услуги</Link>
				<Link to="services/masters" className={styles.footerLink}>Занаятчии</Link>
				<Link to="/services/health" className={styles.footerLink}>Здраве и красота</Link>
				<Link to="/services/social" className={styles.footerLink}>Образователни и социални дейности</Link>
			</section>
			<section className={styles.footerSection}>
				<h5>Условия на платформата</h5>
				<h5>За платформата</h5>
				<h5>Промо обяви</h5>
				<h5>Въпроси</h5>
			</section>
			<section className={styles.footerSection}>
				<StyledLinkBtn href="/sign-up" text="Регистрирай се"/>
				<StyledLinkBtn href="/categories" text="Виж обявите"/>
			</section>
		</footer>
	)
}

export default Footer