import LoginForm from "../../Components/AuthForms/LoginForm.jsx"
import AuthHeader from "../../Components/AuthHeader/AuthHeader.jsx"
import logo from "../../../assets/images/n-letter-png-transparent-images-76708.svg"
import BenefitsSidebox from "../../Components/BenefitsSidebox/BenefitsSidebox.jsx"
import styles from "./Auth.module.css"
import RegisterForm from "../../Components/AuthForms/RegisterForm.jsx"


const Auth = ({ authType }) => {
	return (
		<section className={ styles.mainWrapper }>

			<section className={ styles.inputsSection }>
				<AuthHeader authType={ authType } logo={ logo } className={ styles.headingCustomized }/>
				{ authType === 'login'
					? <LoginForm className={ styles.formClassName }/>
					: <RegisterForm className={ styles.formClassName }/>
				}
			</section>

			<section className={ styles.benefitsSection }>
				<BenefitsSidebox authType={ authType }/>
			</section>

		</section>
	)
}

export default Auth