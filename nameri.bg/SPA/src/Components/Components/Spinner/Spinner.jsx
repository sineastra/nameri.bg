import styles from "./Spinner.module.css"
import MainPageLayout from "../common/MainPageLayout/MainPageLayout.jsx"


const Spinner = () => {

	return (
		<div className={ styles.wrapper }>
			<div className={ styles['lds-facebook'] }>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>

	)
}

export default Spinner