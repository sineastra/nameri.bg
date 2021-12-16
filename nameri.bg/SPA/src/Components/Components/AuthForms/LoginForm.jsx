import { useContext } from "react"
import styles from "./AuthForms.module.css"
import StyledBtn from "../StyledLinkBtn/StyledBtn.jsx"
import userServices from "../../../services/userServices.js"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import processNewToken from "../../../helpers/processNewToken.js"


const LoginForm = ({ className = "" }) => {
	const [_, setError] = useContext(ErrorContext)
	const [userData, setUserData] = useContext(UserContext)

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		const response = await userServices.signIn(formDataObj)

		if (response.ok) {
			setUserData(processNewToken(response.token))
		} else {
			setError(`Error: ${ e.message }`)
		}

		//TODO: Add auth form validators
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