import styles from "./ProfileEdit.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useContext, useEffect, useRef, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../../Contexts/UserContext.jsx"
import { Navigate, useNavigate } from "react-router-dom"


const DetailsArticle = () => {
	const p1 = `В полето за "Повече информация за вас" разкажи за твоя професионален опит,
	а
по-долу в
"ДИПЛОМИ И СЕРТИФИКАТИ" можеш да добавиш квалификациите, които имаш. Профилната
снимка
говори за
твоята
идентичност. Можеш да добавиш нова или да редактираш стара от полето "KAЧИ ПРОФИЛНА
СНИМКА". `
	const p2 = `Разбира се контактите са най-важни. Така ще съкратиш връзката между теб и бъдещите си клиенти.`
	const summary = `С добавянето на повече информация за теб, даваш възможност на товите потенциални клиенти да те опознаят по-добре. `

	return (
		<>
			<article className={ `${ styles.details } ${ styles.detailsBig }` }>
				<p>{ summary + p1 }</p>
				<p>{ p2 }</p>
			</article>
			<article className={ `${ styles.details } ${ styles.detailsSmall }` }>
				<details>
					<summary>{ summary }</summary>
					<p>{ p1 }</p>
					<p>{ p2 }</p>
				</details>
			</article>
		</>
	)
}

const ProfileEdit = () => {
	const skippedInitialEffect = useRef(false)
	const [loggedInUser, setLoggedInUser] = useContext(UserContext)
	const [userData, setUserData] = useState({})
	const [validFormData, setValidFormData] = useState(false)
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const fetchedUser = await userServices.getUserForProfile(loggedInUser._id)

			setUserData(fetchedUser)
		}

		if (skippedInitialEffect.current === false) {
			skippedInitialEffect.current = true
		} else {
			fetchData()
		}
	}, [loggedInUser])

	useEffect(() => {
		//TODO: implement post request logic
		if (validFormData) {
			navigate("/")
		} else {
			console.log('invalid')
		}
	}, [validFormData])

	const validateForm = (formData) => {
		const resultObj = {}

		const validationObj = {
			nameAndSurname: (value) => value.length <= 6,
			phone: (value) => value.length !== 0 && !value.match(/\+359[0-9]{9}|0[0-9]{9}/g),
			website: (value) => value.length !== 0 && !value.match(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g),
			email: (value) => !value.match(/^\S+@\S+$/g),
			address: (value) => value.length <= 5 && value.length !== 0,
			password: (value) => value.length <= 5 && value.length !== 0,
			repeatPassword: (value, pass) => value !== pass,
		}

		Object.entries(formData).forEach(([formElementName, formElementValue]) => {
			if (validationObj[formElementName] !== undefined)
				resultObj[formElementName] = validationObj[formElementName](formElementValue, formData.password)
		})

		Object.entries(resultObj).every(([key, value]) => value === false)
			? setValidFormData(formData)
			: setErrors(resultObj)
	}

	const submitForm = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		validateForm(formDataObj)
	}

	return (
		skippedInitialEffect !== false ?
			loggedInUser !== null ?
				<MainPageLayout>

					<form className={ styles.mainWrapper } onSubmit={ submitForm } method="POST">
						<section className={ styles.smallerWrapper20 }>
							<h1 className={ styles.mainHeader }>РЕДАКТИРАЙ ПРОФИЛ</h1>
							<DetailsArticle/>
							<section className={ styles.smallerWrapper }>

								{/*Name Input Section*/ }
								<input type="text" placeholder="Име и фамилия" name="nameAndSurname"
								       defaultValue={ userData.nameAndSurname }
								       className={ errors.nameAndSurname ? styles.invalidInput : '' }/>
								{ errors.nameAndSurname &&
									<div className={ styles.errorElement }>
										Името и Фамилията трябва да са поне 6 знака.
									</div> }
								{/*End of Name Input Section*/ }

								<div className={ styles.halfInputWrapper }>
									{/*Phone Section*/ }
									<input type="text" placeholder="Телефон" name="phone"
									       className={ `${ styles.halfInput } ${ errors.phone ? styles.invalidInput : '' }` }
									       defaultValue={ userData.phone }/>
									{ errors.phone &&
										<div className={ styles.errorElement }>
											Телефона тряба да започва с +359 или с 0 и да е 9 символа след това (Валиден
											телефон за България)
										</div> }
									{/*End of Phone Section*/ }

									{/*Website Section*/ }
									<input type="text" placeholder="Уебсайт" name="website"
									       className={ `${ styles.halfInput } ${ errors.website ? styles.invalidInput : '' }` }
									       defaultValue={ userData.website }/>
									{ errors.website &&
										<div className={ styles.errorElement }>
											Валиден уеб сайт, моля.
										</div> }
									{/*End of Website Section*/ }

									{/*Email Section*/ }
									<input type="text" placeholder="Имейл" name="email"
									       className={ `${ styles.halfInput } ${ errors.email ? styles.invalidInput : '' }` }
									       defaultValue={ userData.email }/>
									{ errors.email &&
										<div className={ styles.errorElement }>
											Невалиден имейл.
										</div> }
									{/*End of Email Section*/ }

									{/*Address Section*/ }
									<input type="text" placeholder="Адрес" name="address"
									       className={ `${ styles.halfInput } ${ errors.address ? styles.invalidInput : '' }` }
									       defaultValue={ userData.address }/>
									{ errors.address &&
										<div className={ styles.errorElement }>
											Адреса трябва да е поне 5 символа.
										</div> }
									{/*End of Address Section*/ }
								</div>

								{/*Skills Section*/ }
								<input type="text" name="skills" placeholder="Умения"
								       defaultValue={ userData.skills?.join(', ') }/>

								{/*About me TextArea*/ }
								<textarea name="about" id="aboutTextarea" placeholder="За мен..."
								          className={ styles.textArea } defaultValue={ userData.about }/>

								{/*Pics Upload*/ }
								<CustomInputFile className={ styles.customInput }/>

								{/*New Password Section*/ }
								<div>
									<h1>Промени парола</h1>
									<div className={ styles.halfInputWrapper }>

										{/*First Input*/ }
										<input type="password"
										       className={ `${ styles.halfInput } ${ errors.password ? styles.invalidInput : '' }` }
										       name="password"
										       placeholder="Нова Парола"/>
										{ errors.password &&
											<div className={ styles.errorElement }>
												Паролата трябва да е поне 5 символа.
											</div> }

										{/*Second Input*/ }
										<input type="password"
										       className={ `${ styles.halfInput } ${ errors.repeatPassword ? styles.invalidInput : '' }` }
										       name="repeatPassword"
										       placeholder="Повтори Нова Парола"/>
										{ errors.repeatPassword &&
											<div className={ styles.errorElement }>
												Паролите не съвпадат.
											</div> }
									</div>
								</div>
								{/*End of New Password Section*/ }

							</section>
						</section>
						<div className={ styles.submitBtnWrapper }>
							<button className={ styles.submitBtn } type="submit">ЗАПАЗИ</button>
						</div>
					</form>
				</MainPageLayout>
				: <Navigate to="/sign-up"/>
			: null
	)
}

export default ProfileEdit
