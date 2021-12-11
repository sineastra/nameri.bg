import styles from "./CategoryCard.module.css"


const CategoryCard = ({ className, categoryIcon, categoryName, subCategories }) => {
	const joinedSubs = subCategories.map(x => x.name).join(', ')

	return (
		<div className={ `${ className } ${ styles.outerSection }` }>
			<div>
				<img src={ categoryIcon } alt="Category Image" className={ styles.categoryIcon }/>
				<h2>{ categoryName }</h2>
			</div>
			<div className={ styles.joinedSubs }>
				<div className={styles.innerJoined}>
					{ joinedSubs }
				</div>
			</div>
		</div>
	)
}

export default CategoryCard