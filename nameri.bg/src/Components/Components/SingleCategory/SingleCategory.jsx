import styles from "./SingleCategory.module.css"


const SingleCategory = ({ className = '', categoryName, servicesCount }) => {

	return (
		<div className={`${styles.singleCatCont} ${className}`}>
			<div>{categoryName}</div>
			<div>{servicesCount}</div>
		</div>
	)
}

export default SingleCategory