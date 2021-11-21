import styles from "./SingleListCategory.module.css"


const SingleListCategory = ({ className = '', categoryName, servicesCount }) => {

	return (
		<div className={`${styles.singleCatCont} ${className}`}>
			<div>{categoryName}</div>
			<div>{servicesCount}</div>
		</div>
	)
}

export default SingleListCategory