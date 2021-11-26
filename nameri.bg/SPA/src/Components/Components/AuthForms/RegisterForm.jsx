import styles from "./AuthForms.module.css"
import StyledBtn from "../StyledLinkBtn/StyledBtn.jsx"
import ErrorContext from "../../../Contexts/ErrorContext.jsx"
import userServices from "../../../services/userServices.js"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import getToken from "../../../helpers/getToken.js"
import UserContext from "../../../Contexts/UserContext.jsx"


const RegisterForm = ({ className }) => {
	const [_, setError] = useContext(ErrorContext)
	const [userData, setUserData] = useContext(UserContext)

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		if (formDataObj.password !== formDataObj.repeatPassword) {
			setError('Passwords do no match')
			return
		}

		if (Boolean(formDataObj.checkbox) !== true) {
			setError('You must accept the terms.')
			return
		}

		const response = await userServices.signUp(formDataObj)

		if (response.ok) {
			const userData = deserializeJWT(getToken())
			setUserData(userData)
		} else {
			setError(`Error: ${ e.message }`)
		}
	}

	return (
		// --->
		userData
			? <Navigate to="/"/>
			: <div className={ `${ styles.inputsCont } ${ className }` }>
				<h1 className={ styles.mainHeader }>Регистрация</h1>
				<form className={ styles.inputFieldsCont } onSubmit={ submitHandler } method="POST">
					<input type="text" name="email" placeholder="Потребителски имейл"
					       className={ styles.inputField }/>
					<input type="text" name="nameAndSurname" placeholder="Име и Фамилия"
					       className={ styles.inputField }/>
					<input type="password" name="password" placeholder="Парола" className={ styles.inputField }/>
					<input type="password" name="repeatPassword" placeholder="Повтори парола"
					       className={ styles.inputField }/>
					<div className={ styles.checkBoxCont }>
						<input type="checkbox" className={ styles.checkBox } name="checkbox"/>
						<div className={ styles.checkBoxDetails }>Декларирам че съм запознат и приемам Правилата за
							поверителност, Общите условия и Защитата на личните данни на nameri.bg ООД
						</div>
					</div>
					<StyledBtn text="Регистрация"/>
				</form>
			</div>
		// --->
	)
}

export default RegisterForm