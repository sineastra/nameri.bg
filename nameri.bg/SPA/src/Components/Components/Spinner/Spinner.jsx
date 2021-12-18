import styles from "./Spinner.module.css"


const Spinner = () => {

	return (
		<div className={styles.wrapper}>
			<div className={ styles['lds-facebook'] }>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Spinner