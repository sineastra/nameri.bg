import styles from "./BenefitsSidebox.module.css"
import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"


const Benefits = ({ benefits }) => {
	return (
		<div className={styles.benefitsWrapper}>
			{benefits.map(x => (
				<IconContext.Provider value={{ color: "green", size: '1.8em' }}>
					<div className={styles.benefitDiv}>
						<FaCheck/>
						<div className={styles.benefitText}>
							{x}
						</div>
					</div>
				</IconContext.Provider>
			))}
		</div>
	)
}

const BenefitsSidebox = ({ benefitsHeaderText, benefitsArr, className }) => {

	return (
		<section className={`${className} ${styles.wrapper}`}>
			<h1 className={styles.header}>{benefitsHeaderText}</h1>
			<Benefits benefits={benefitsArr}/>
		</section>
	)
}

export default BenefitsSidebox