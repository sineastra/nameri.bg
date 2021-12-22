import styles from "./CategoryCard.module.css"
import { Link } from "react-router-dom"
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const CategoryCard = ({ _id, className, categoryIcon, categoryName, subCategories }) => {
	const [iconLoaded, setIconLoaded] = useState(false)
	const joinedSubs = subCategories.map(x => x.name).join(', ')

	return (
		<>
			<Link to={ `/categories/${ _id }` }
			      className={ `${ className } ${ styles.outerSection } ${ iconLoaded ? styles.show : styles.hide }` }>
				<div>
					<img
						src={ categoryIcon }
						alt="category"
						className={ iconLoaded ? `${ styles.categoryIcon } ${ styles.show }` : styles.hide }
						onLoad={ () => setIconLoaded(true) }
						onError={ () => setIconLoaded(false) }
					/>
					<h2>{ categoryName }</h2>
				</div>
				<div className={ styles.joinedSubs }>
					{ joinedSubs }
				</div>
			</Link>
			<ImageLoadingPlaceholder
				outerClassName={ iconLoaded ? styles.hide : `${ styles.show } ${ styles.outerSection } ${ styles.iconLoader } ${ className }` }/>
		</>
	)
}

export default CategoryCard