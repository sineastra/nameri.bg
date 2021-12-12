import styles from "./ProfileEdit.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useContext, useEffect, useRef, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../../Contexts/UserContext.jsx"
import { Navigate, useNavigate } from "react-router-dom"


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
							<h1>РЕДАКТИРАЙ ПРОФИЛ</h1>
							<article className={ styles.details }>
								<p>С добавянето на повече информация за теб, даваш възможност на товите потенциални
									клиенти
									да
									те
									опознаят
									по-добре. В полето за "Повече информация за вас" разкажи за твоя професионален опит,
									а
									по-долу в
									"ДИПЛОМИ И СЕРТИФИКАТИ" можеш да добавиш квалификациите, които имаш. Профилната
									снимка
									говори за
									твоята
									идентичност. Можеш да добавиш нова или да редактираш стара от полето "KAЧИ ПРОФИЛНА
									СНИМКА". </p>

								<p>Разбира се контактите са най-важни. Така ще съкратиш връзката между теб и бъдещите си
									клиенти.</p>
							</article>
							<section className={ styles.smallerWrapper }>
								<input type="text" placeholder="Име и фамилия" name="nameAndSurname"
								       defaultValue={ userData.nameAndSurname }
								       className={ errors.nameAndSurname ? styles.invalidInput : '' }/>
								{ errors.nameAndSurname &&
									<div className={ styles.errorElement }>
										Името и Фамилията трябва да са поне 6 знака.
									</div> }
								<div className={ styles.halfInputWrapper }>
									<input type="text" placeholder="Телефон" name="phone"
									       className={ `${ styles.halfInput } ${ errors.phone ? styles.invalidInput : '' }` }
									       defaultValue={ userData.phone }/>
									{ errors.phone &&
										<div className={ styles.errorElement }>
											Телефона тряба да започва с +359 или с 0 и да е 9 символа след това (Валиден
											телефон за България)
										</div> }
									<input type="text" placeholder="Уебсайт" name="website"
									       className={ `${ styles.halfInput } ${ errors.website ? styles.invalidInput : '' }` }
									       defaultValue={ userData.website }/>
									{ errors.website &&
										<div className={ styles.errorElement }>
											Валиден уеб сайт, моля.
										</div> }
									<input type="text" placeholder="Имейл" name="email"
									       className={ `${ styles.halfInput } ${ errors.email ? styles.invalidInput : '' }` }
									       defaultValue={ userData.email }/>
									{ errors.email &&
										<div className={ styles.errorElement }>
											Невалиден имейл.
										</div> }
									<input type="text" placeholder="Адрес" name="address"
									       className={ `${ styles.halfInput } ${ errors.address ? styles.invalidInput : '' }` }
									       defaultValue={ userData.address }/>
									{ errors.address &&
										<div className={ styles.errorElement }>
											Адреса трябва да е поне 5 символа.
										</div> }
								</div>
								<input type="text" name="skills" placeholder="Умения" defaultValue={ userData.skills }/>
								<textarea name="about" id="aboutTextarea" placeholder="За мен..."
								          className={ styles.textArea } defaultValue={ userData.about }/>
								<CustomInputFile className={ styles.customInput }/>
								<div>
									<h1>Промени парола</h1>
									<div className={ styles.halfInputWrapper }>
										<input type="password"
										       className={ `${ styles.halfInput } ${ errors.password ? styles.invalidInput : '' }` }
										       name="password"
										       placeholder="Нова Парола"/>
										{ errors.password &&
											<div className={ styles.errorElement }>
												Паролата трябва да е поне 5 символа.
											</div> }
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
