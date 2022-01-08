import styles from "./ProfileEdit.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useContext, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../Contexts/UserContext.jsx"
import useFetch from "../../../hooks/useFetch.jsx"
import { profileEditFormValidator } from "../../../helpers/formValidators.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import TagInput from "../../Components/TagInput/TagInput.jsx"
import { useNavigate } from "react-router-dom"
import processNewToken from "../../../helpers/processNewToken.js"
import StyledBtn from "../../Components/StyledBtn/StyledBtn.jsx"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


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
	const [userData, setUserData] = useContext(UserContext)
	const {
		isLoadingData,
		setIsLoadingData,
		data,
		setData,
	} = useFetch(() => userServices.getUserForProfile(userData._id, userData))
	const { processRequest } = useContext(UtilityContext)
	const [profileImg, setProfileImg] = useState('')
	const [formDataErrors, setFormDataErrors] = useState({})
	const navigate = useNavigate()

	const submitForm = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)
		const validationResult = profileEditFormValidator(formDataObj)

		formDataObj.skills = JSON.stringify(data.skills)
		formDataObj.profileImg = profileImg

		const formDataFinal = Object.entries(formDataObj).reduce((a, [key, value]) => {
			a.append(key, value)

			return a
		}, new FormData())

		if (validationResult.valid) {
			setIsLoadingData(true)
			const resData = await processRequest(() => userServices.editProfile(userData._id, formDataFinal))

			if (resData !== undefined) {
				setUserData(processNewToken(resData.token))

				navigate(`/profile/${ userData._id }`)
			} else {
				setIsLoadingData(false)
			}
		} else {
			setFormDataErrors(validationResult.data)
		}
	}

	const addSkill = (e) => {
		alert(e.code)
		if (e.code === "Space" && e.target.value.trim() !== '') {
			const value = e.target.value.trim()

			if (data.skills.every(x => x !== value)) {
				setData(oldData => ({ ...oldData, skills: [...oldData.skills, value] }))
			}

			e.target.value = ''
		}
	}

	const removeSkill = (text) => {
		setData(oldData => ({ ...oldData, skills: oldData.skills.filter(x => x !== text) }))
	}

	const clearError = (error) => {
		setFormDataErrors(oldErrors => ({ ...oldErrors, [error]: true }))
	}

	const addImg = (e) => {
		const profileImg = e.target.files[0]

		setProfileImg(profileImg)
	}

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<form className={ styles.mainWrapper } onSubmit={ submitForm }>
					<section className={ styles.smallerWrapper20 }>
						<h1 className={ styles.mainHeader }>РЕДАКТИРАЙ ПРОФИЛ</h1>
						<DetailsArticle/>
						<section className={ styles.smallerWrapper }>

							{/*Name Input Section*/ }
							<div className={ styles.inputWrapper }>
								<input type="text"
								       placeholder="Име и фамилия"
								       name="nameAndSurname"
								       defaultValue={ data.nameAndSurname }
								       onFocus={ () => clearError('nameAndSurname') }
								       className={ `${ styles.inputStyles } ${ formDataErrors.nameAndSurname === false ? styles.invalidInput : '' }` }/>
								{ formDataErrors.nameAndSurname === false &&
									<div className={ styles.errorElement }>
										Името и Фамилията трябва да са поне 6 знака.
									</div> }
							</div>
							{/*End of Name Input Section*/ }

							<div className={ styles.halfInputOuterWrapper }>
								{/*Phone Section*/ }
								<div className={ styles.halfInput }>
									<input type="text" placeholder="Телефон" name="phone"
									       className={ `${ styles.inputStyles } ${ formDataErrors.phone === false ? styles.invalidInput : '' }` }
									       defaultValue={ data.phone ? `+359${ data.phone }` : '' }
									       onFocus={ () => clearError('phone') }
									/>
									{ formDataErrors.phone === false &&
										<div className={ styles.errorElement }>
											Телефона тряба да започва с +359 или с 0 и да е 9 символа след това (Валиден
											телефон за България)
										</div> }
								</div>
								{/*End of Phone Section*/ }

								{/*Website Section*/ }
								<div className={ styles.halfInput }>
									<input type="text" placeholder="Уебсайт" name="website"
									       className={ `${ styles.inputStyles } ${ formDataErrors.website === false ? styles.invalidInput : '' }` }
									       defaultValue={ data.website }
									       onFocus={ () => clearError('website') }/>
									{ formDataErrors.website === false &&
										<div className={ styles.errorElement }>
											Валиден уеб сайт, моля.
										</div>
									}

								</div>
								{/*End of Website Section*/ }

								{/*Email Section*/ }
								<div className={ styles.halfInput }>
									<input type="text" placeholder="Имейл" name="email"
									       className={ `${ styles.inputStyles } ${ formDataErrors.email === false ? styles.invalidInput : '' }` }
									       defaultValue={ data.email }
									       onFocus={ () => clearError('email') }
									/>
									{ formDataErrors.email === false &&
										<div className={ styles.errorElement }>
											Невалиден имейл.
										</div> }
								</div>
								{/*End of Email Section*/ }

								{/*Address Section*/ }
								<div className={ styles.halfInput }>
									<input type="text" placeholder="Адрес" name="address"
									       className={ `${ styles.inputStyles } ${ formDataErrors.address === false ? styles.invalidInput : '' }` }
									       defaultValue={ data.address }
									       onFocus={ () => clearError('address') }
									/>
									{ formDataErrors.address === false &&
										<div className={ styles.errorElement }>
											Адреса трябва да е поне 5 символа.
										</div> }
								</div>
								{/*End of Address Section*/ }
							</div>

							{/*Skills Section*/ }
							<TagInput
								wrapperClassName={ styles.skillsInputWrapper }
								inputName="skills"
								onFocus={ () => clearError('skills') }
								onKeyUp={ addSkill }
								data={ data.skills }
								errors={ formDataErrors }
								removeDataEntry={ removeSkill }
								inputText="Умения (Добави със спейс)"
							/>
							{/*<input type="text" name="skills" placeholder="Умения"*/ }
							{/*       defaultValue={ data.skills?.join(', ') }/>*/ }

							{/*About me TextArea*/ }
							<textarea name="about" id="aboutTextarea" placeholder="За мен..."
							          className={ styles.textArea } defaultValue={ data.about }/>

							{/*Pics Upload*/ }
							<CustomInputFile
								className={ styles.customInput }
								inputName="profileImg"
								text="Качи нова профилна снимка"
								onChange={ addImg }
							/>

							{/*New Password Section*/ }
							<div>
								<h1 className={ styles.changePasswordHeader }>Промени парола</h1>
								<div className={ styles.halfInputOuterWrapper }>

									{/*First Input*/ }
									<div className={ styles.halfInput }>
										<input type="password"
										       className={ `${ styles.inputStyles } ${ formDataErrors.password === false ? styles.invalidInput : '' }` }
										       name="password"
										       placeholder="Нова Парола"
										       autoComplete="one-time-code"
										       onFocus={ () => clearError('password') }
										/>
										{ formDataErrors.password === false &&
											<div className={ styles.errorElement }>
												Паролата трябва да е поне 6 символа.
											</div> }
									</div>

									{/*Second Input*/ }
									<div className={ styles.halfInput }>
										<input type="password"
										       className={ `${ styles.inputStyles } ${ formDataErrors.repeatPassword === false ? styles.invalidInput : '' }` }
										       name="repeatPassword"
										       placeholder="Повтори Нова Парола"
										       autoComplete="one-time-code"
										       onFocus={ () => clearError('repeatPassword') }
										/>
										{ formDataErrors.repeatPassword === false &&
											<div className={ styles.errorElement }>
												Паролите не съвпадат.
											</div>
										}
									</div>
								</div>
							</div>
							{/*End of New Password Section*/ }

						</section>
					</section>
					<div className={ styles.submitBtnWrapper }>
						<StyledBtn className={ styles.submitBtn } type="submit">ЗАПАЗИ</StyledBtn>
					</div>
				</form>
			</MainPageLayout>
	)
}

export default ProfileEdit
