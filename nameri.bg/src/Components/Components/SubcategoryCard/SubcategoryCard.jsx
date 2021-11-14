import styles from "./SubcategoryCard.module.css"
import { FaGreaterThan } from "react-icons/fa"


const SubcategoryCard = ({ categoryName, subCatsCount }) => {
	return (
		<section className={styles.outerContainer}>
			<div>
				<h2 className={styles.subCatHeader}>{categoryName || "Категория"}</h2>
			</div>
			<div className={styles.countContainer}>
				<div>
					<span className={styles.grey}>Брой обяви: </span><span
					className={styles.darkRedColor}>{subCatsCount}</span>
				</div>
				<div className={styles.darkRedColor}>
					<FaGreaterThan/>
				</div>
			</div>
		</section>
	)
}

export default SubcategoryCard