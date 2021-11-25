import styles from "./BenefitsSidebox.module.css"
import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"


const Benefits = ({ benefits }) => {

	return (
		<div className={ styles.benefitsWrapper }>
			{ benefits.map(x => (
				<IconContext.Provider value={ { color: "green", size: '1.8em' } }>
					<div className={ styles.benefitDiv }>
						<FaCheck/>
						<div className={ styles.benefitText }>
							{ x }
						</div>
					</div>
				</IconContext.Provider>
			)) }
		</div>
	)
}

const BenefitsSidebox = ({ className, authType }) => {
	const [benefitsArr, benefitsHeaderText] = authType === 'login'
		? [
			["Трупане на бонус точки", "Специални отстъпки", "Връзка със специалисти от цялата страна и света"],
			"ПРОФИЛА В ПЛАТФОРМАТА ДАВА ВЪЗМОЖНОСТ ЗА:",
			"Влез",
		]
		: [
			["Връзка със специалистите в платформата", "Публикуване на една безплатна обява", "Развитие на твоя бизнес"],
			"С ПРОФИЛ В ПЛАТФОРМАТА ПОЛУЧАВАШ ВЪЗМОЖНОСТ ЗА:",
			"Регистрация",
		]

	return (
		<div className={ `${ className } ${ styles.mainWrapper }` }>
			<h1 className={ styles.header }>{ benefitsHeaderText }</h1>
			<Benefits benefits={ benefitsArr }/>
		</div>
	)
}

export default BenefitsSidebox