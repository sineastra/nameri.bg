import styles from "./AuthForms.module.css"
import StyledLinkBtn from "../StyledLinkBtn/StyledLinkBtn.jsx"


const LoginForm = ({ className }) => {
	const submitHandler = (e) => {
		e.preventDefault()

		console.log(e)
	}

	return (
		// --->
		<form className={ `${ styles.inputsCont } ${ className }` } onSubmit={ submitHandler }>
			<h1 className={ styles.mainHeader }>Влез</h1>
			<div className={ styles.inputFieldsCont }>
				<input type="text" name="username" placeholder="Потребителско име" className={ styles.inputField }/>
				<input type="password" name="password" placeholder="Парола" className={ styles.inputField }/>
			</div>
			<StyledLinkBtn text="Влез"/>
		</form>
		// --->
	)
}

export default LoginForm