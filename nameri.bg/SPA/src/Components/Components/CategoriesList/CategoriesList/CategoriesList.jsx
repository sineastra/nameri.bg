import styles from "./CategoriesList.module.css"
import SingleListCategory from "../SingleListCategory/SingleListCategory.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../../services/categoriesService.js"


const CategoriesList = () => {
	const [subCats, setSubCats] = useState([])

	useEffect(async () => {
		// TODO: this is for refactoring into custom Hook
		const data = await categoriesService.getWithMostSubCats(2)

		setSubCats(data)
	}, [])

	return (
		<section className={ styles.randomCategoriesCont }>
			<div className={ styles.randomCatsInnerCont }>
				{ subCats.map(category => (
					<div className={ styles.randomCatsSingleCont }>
						<h1 className={ styles.mainHeader }>{ category.name }</h1>
						<div className={ styles.innerRandom } key={ category._id }>
							{ category.subcategories.map(subCat => (
								<SingleListCategory
									key={ subCat._id }
									_id={ subCat._id }
									name={ subCat.name }
									listings={ subCat.listings }
									className={ styles.singleCat }
								/>))
							}
						</div>
					</div>
				)) }
			</div>
		</section>
	)
}

export default CategoriesList