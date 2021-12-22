import LoginForm from "../../Components/AuthForms/LoginForm.jsx"
import Benefits from "../../Components/BenefitsSidebox/Benefits.jsx"
import styles from "./Auth.module.css"
import RegisterForm from "../../Components/AuthForms/RegisterForm.jsx"
import { Link } from "react-router-dom"


const Auth = ({ authType }) => {
	const actionText = authType === 'login' ? 'Влез' : "Регистрация"
	const redirectText = authType === 'login' ? "Регистрация" : 'Влез'
	const miscText = authType === 'login' ? "Все още нямаш профил в платформата?" : "Вече имаш профил?"
	const linkHref = authType === 'login' ? '/sign-up' : '/sign-in'

	return (
		<div
			className={ `${ styles.wrapper } ${ authType === 'login' ? styles.shortMain : styles.longMain }` }>
			<section className={ styles.mainWrapper }>

				<section className={ styles.headerSectionOuter }>
					<div className={ styles.headerSectionInner }>
						<h1 className={ styles.header }>{ actionText }</h1>
						<span>
							<span className={ styles.miscText }>{ miscText } | </span>
							<Link to={ linkHref } className={ styles.redirectLink }>{ redirectText }</Link>
							</span>
					</div>
					<Benefits authType={ authType }/>
				</section>

				<section className={ styles.authFieldsSection }>
					{ authType === 'login'
						? <LoginForm className={ styles.formClassName }/>
						: <RegisterForm className={ styles.formClassName }/>
					}
				</section>

			</section>
		</div>
	)
}

export default Auth