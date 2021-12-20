import { FaGithub, FaLinkedin, FaFacebookF } from "react-icons/fa"
import { Link } from "react-router-dom"
import sineastraLogo from "../../../../assets/images/letter-s-between-straight-parenthesis-symbol.svg"
import styles from './Footer.module.css'
import { IconContext } from "react-icons"
import StyledBtn from "../../StyledBtn/StyledBtn.jsx"
import { useContext } from "react"
import UserContext from "../../../Contexts/UserContext.jsx"


const Footer = () => {
	const [user] = useContext(UserContext)

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
				<Link to="/categories/61a0f00f229cb4690d2b88d1" className={ styles.footerLink }>Авто услуги</Link>
				<Link to="/categories/61a0f00f229cb4690d2b88d3" className={ styles.footerLink }>Дигитални услуги</Link>
				<Link to="/categories/61a0f00f229cb4690d2b88ce" className={ styles.footerLink }>Занаятчии</Link>
				<Link to="/categories/61a0f00f229cb4690d2b88cd" className={ styles.footerLink }>Здраве и красота</Link>
				<Link to="/categories/61a0f00f229cb4690d2b88cc" className={ styles.footerLink }>Образователни и социални
					дейности</Link>
			</section>
			<section className={ styles.footerSection }>
				<h5 className={ styles.footerSmallHeader }><Link to="/have-fun">Линк към 404 страницата</Link></h5>
				<h5 className={ styles.footerSmallHeader }><Link to="/about">За платформата</Link></h5>
				<h5 className={ styles.footerSmallHeader }><Link to="/top-users">Топ потребители</Link></h5>
			</section>
			<section className={ styles.footerSection }>
				{ !user &&
					<Link to="/sign-up"><StyledBtn text="Регистрирай се" className={ styles.styledBtnClass }/></Link> }
				<Link to="/categories">
					<StyledBtn text="Виж категориите" className={ styles.styledBtnClass }/>
				</Link>
			</section>
		</footer>
	)
}

export default Footer