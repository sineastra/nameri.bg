import AuthHeader from "../AuthHeader/AuthHeader.jsx"
import logo from "../../../assets/images/n-letter-png-transparent-images-76708.svg"
import styles from "./AuthInputsSection.module.css"
import StyledLinkBtn from "../StyledLinkBtn/StyledLinkBtn.jsx"
import { useState } from "react"


const RadioBtn = ({ onClick }) => {

	return (
		<div>
			<input type="radio" onClick={onClick}/>
			<span>Декларирам че съм запознат и приемам Правилата за поверителност, Общите условия и Защитата на личните данни на nameri.bg ООД</span>
		</div>
	)
}

const Inputs = ({ inputsData, className }) => {

	return (
		<div className={className}>
			{inputsData.map(x => (
				<input type={x.type} name={x.name} id={x.id} placeholder={x.placeholder}
				       className={`${x.className} ${styles.inputField}`} key={x.name}/>
			))}
		</div>
	)
}

const AuthInputsSection = ({
	                           pageType,
	                           headerText,
	                           inputsData,
	                           btnText,
	                           conditionsField = true,
	                           setFormData,
	                           className,
                           }) => {
	const [radio, setRadio] = useState(false)

	const updateRadio = (e) =>
		setRadio(e.target.checked || false)

	const processFormData = (formData) => {
		if (formData && radio) {
			setFormData(formData)
		}
	}

	return (
		<section className={`${styles.mainWrapper} ${className}`}>
			<AuthHeader linkText={pageType} logo={logo} className={styles.headingCustomized}/>
			<div className={styles.inputsCont}>
				<h1 className={styles.mainHeader}>{headerText}</h1>
				<Inputs inputsData={inputsData} className={styles.inputFieldsCont}/>
				<StyledLinkBtn text={btnText} onClick={processFormData} className={styles.submitBtn}/>
				{conditionsField ? <RadioBtn onClick={updateRadio}/> : ""}
			</div>
		</section>
	)
}

export default AuthInputsSection