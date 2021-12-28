import styles from "./AuthForms.module.css"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"
import SoftErrorsContext from "../../Contexts/SoftErrorsContext.jsx"
import userServices from "../../../services/userServices.js"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import getToken from "../../../helpers/getToken.js"
import UserContext from "../../Contexts/UserContext.jsx"
import { registerFormValidator } from "../../../helpers/formValidators.js"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"
import processNewToken from "../../../helpers/processNewToken.js"


const RegisterForm = ({ className }) => {
	const [, setErrors] = useContext(SoftErrorsContext)
	const [userData, setUserData] = useContext(UserContext)

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		formDataObj.terms = !!formDataObj.terms
		const validation = registerFormValidator(formDataObj)

		if (validation.valid) {
			const response = await userServices.signUp(formDataObj)

			if (response.ok) {
				setUserData(processNewToken(response.token))
			} else {
				setErrors(extractErrorMessages(response.errors))
			}
		} else {
			const mappedErrors = Object.entries(validation.data)

			setErrors(extractErrorMessages(mappedErrors, {
				email: 'Невалиден имейл',
				password: 'Паролата трябва да е поне 6 символа',
				repeatPassword: 'Паролите не съвпадат',
				terms: 'Трябва да приемеш условията за апартамента.',
				nameAndSurname: 'Имената са задължителни.',
			}))
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
						<input type="checkbox" className={ styles.checkBox } name="terms"/>
						<div className={ styles.checkBoxDetails }>Декларирам че съм запознат и приемам Правилата за
							поверителност, Общите условия и Защитата на личните данни на nameri.bg ООД
						</div>
					</div>
					<StyledBtn text="Регистрация" className={ styles.styledBtn }/>
				</form>
			</div>
		// --->
	)
}

export default RegisterForm