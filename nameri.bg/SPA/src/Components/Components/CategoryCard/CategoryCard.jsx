import styles from "./CategoryCard.module.css"
import { Link } from "react-router-dom"


const CategoryCard = ({ _id, className, categoryIcon, categoryName, subCategories }) => {
	const joinedSubs = subCategories.map(x => x.name).join(', ')

	return (
		<Link to={ `/categories/${ _id }` } className={ `${ className } ${ styles.outerSection }` }>
			<div>
				<img src={ categoryIcon } alt="Category Image" className={ styles.categoryIcon }/>
				<h2>{ categoryName }</h2>
			</div>
			<div className={ styles.joinedSubs }>
				{ joinedSubs }
			</div>
		</Link>
	)
}

export default CategoryCard