import styles from "./Benefits.module.css"
import { FaCheck } from "react-icons/fa"


const Benefits = ({ className = "", authType }) => {
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
			<div className={ styles.benefitsWrapper }>
				{ benefitsArr.map((x, i) => (
					<div className={ styles.benefitDiv } key={ i }>
						<div className={ styles.iconWrapper }>
							<FaCheck/>
						</div>
						<div className={ styles.benefitText }>
							{ x }
						</div>
					</div>
				)) }
			</div>
		</div>
	)
}

export default Benefits