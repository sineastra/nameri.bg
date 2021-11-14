import styles from "./SingleCategory.module.css"


const SingleCategory = ({ img, name }) => {

	return (
		<div className={styles.categContainer}>
			<img className={styles.image} src={img} alt="Popular Category Image"/>
			<h3 className={styles.categHeading}>{name}</h3>
		</div>
	)
}

export default SingleCategory