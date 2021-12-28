import { useContext } from "react"
import styles from "./AuthForms.module.css"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"
import userServices from "../../../services/userServices.js"
import SoftErrorsContext from "../../Contexts/SoftErrorsContext.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import processNewToken from "../../../helpers/processNewToken.js"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"
import { emailValidator } from "../../../helpers/formValidators.js"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


const LoginForm = ({ className = "" }) => {
	const [, setSoftErrors] = useContext(SoftErrorsContext)
	const { processRequest } = useContext(UtilityContext)
	const [, setUserData] = useContext(UserContext)

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		if (emailValidator(formDataObj.email)) {
			const data = await processRequest(() => userServices.signIn(formDataObj))

			data && setUserData(processNewToken(data.token))
		} else {
			setSoftErrors(extractErrorMessages([{ msg: 'Invalid email' }]))
		}
	}

	return (
		<div className={ `${ styles.inputsCont } ${ className }` }>
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