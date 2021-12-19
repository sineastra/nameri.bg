import styles from "./SpinnerSmall.module.css"


const SpinnerSmall = () => {

	return (
		<div className={ styles['lds-facebook'] }>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default SpinnerSmall