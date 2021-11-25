import styles from "./AuthForms.module.css"
import StyledLinkBtn from "../StyledLinkBtn/StyledLinkBtn.jsx"


const RegisterForm = ({ className }) => {
	const submitHandler = (e) => {
		e.preventDefault()

		console.log(e)
	}

	return (
		// --->
		<form className={ `${ styles.inputsCont } ${ className }` } onSubmit={ submitHandler }>
			<h1 className={ styles.mainHeader }>Регистрация</h1>
			<div className={ styles.inputFieldsCont }>
				<input type="text" name="username" placeholder="Потребителско име" className={ styles.inputField }/>
				<input type="text" name="nameAndSurname" placeholder="Име и Фамилия" className={ styles.inputField }/>
				<input type="password" name="password" placeholder="Парола" className={ styles.inputField }/>
				<input type="password" name="repeatPassword" placeholder="Повтори парола"
				       className={ styles.inputField }/>
				<div className={ styles.checkBoxCont }>
					<input type="checkbox" className={ styles.checkBox }/>
					<div className={ styles.checkBoxDetails }>Декларирам че съм запознат и приемам Правилата за
						поверителност, Общите условия и Защитата на личните данни на nameri.bg ООД
					</div>
				</div>
			</div>
			<StyledLinkBtn text="Регистрация"/>
		</form>
		// --->
	)
}

export default RegisterForm