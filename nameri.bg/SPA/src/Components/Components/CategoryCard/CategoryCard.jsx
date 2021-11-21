import styles from "./CategoryCard.module.css"


const CategoryCard = ({ className, categoryImg, categoryName, subCategories }) => {
	const joinedSubs = subCategories.join(', ')

	return (
		<div className={`${className} ${styles.outerSection}`}>
			<div>
				<img src={categoryImg} alt="Category Image" className={styles.categoryImg}/>
			</div>
			<div>
				<h2>{categoryName}</h2>
			</div>
			<div className={styles.joinedSubs}>
				{joinedSubs}
			</div>
		</div>
	)
}

export default CategoryCard