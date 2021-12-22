import { useContext } from "react"
import styles from "./AuthForms.module.css"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"
import userServices from "../../../services/userServices.js"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import { Navigate } from "react-router-dom"
import processNewToken from "../../../helpers/processNewToken.js"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"
import { emailValidator } from "../../../helpers/formValidators.js"


const LoginForm = ({ className = "" }) => {
	const [, setErrors] = useContext(ErrorContext)
	const [userData, setUserData] = useContext(UserContext)

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		if (emailValidator(formDataObj.email)) {
			const response = await userServices.signIn(formDataObj)

			if (response.ok) {
				setUserData(processNewToken(response.token))
			} else {
				setErrors(extractErrorMessages(response.errors))
			}
		} else {
			setErrors(extractErrorMessages([{ msg: 'Invalid email' }]))
		}
	}

	return (
		userData
			? <Navigate to={ "/" }/>
			: <div className={ `${ styles.inputsCont } ${ className }` }>
				<form className={ styles.inputFieldsCont } onSubmit={ submitHandler } method="POST">
					<h1 className={ styles.mainHeader }>Влез</h1>
					<input type="text" name="email" placeholder="Потребителско име" className={ styles.inputField }/>
					<input type="password" name="password" placeholder="Парола" className={ styles.inputField }/>
					<StyledBtn text="Влез" className={ styles.styledBtn }/>
				</form>
			</div>
	)
}

export default LoginForm