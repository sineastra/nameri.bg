import styles from "./Auth.module.css"
import BenefitsSidebox from "../BenefitsSidebox/BenefitsSidebox.jsx"
import AuthInputsSection from "../AuthInputsSection/AuthInputsSection.jsx"
import { useState } from "react"


const Auth = ({
	              authType,
	              headerText,
	              inputsData,
	              btnText,
	              conditionsField = true,
	              benefitsHeaderText,
	              benefitsData,
              }) => {
	const [formData, setFormData] = useState({})
	const pageType = authType === "register" ? "Регистрация" : 'Влез'

	return (
		<section className={styles.mainWrapper}>
			<AuthInputsSection {...{ pageType, headerText, inputsData, btnText, conditionsField, setFormData }}
			                   className={styles.inputsSection}/>
			<BenefitsSidebox benefitsArr={benefitsData} benefitsHeaderText={benefitsHeaderText}
			                 className={styles.benefitsSection}/>
		</section>
	)
}

export default Auth