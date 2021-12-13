import styles from "./CategoriesList.module.css"
import SingleListCategory from "../SingleListCategory/SingleListCategory.jsx"
import { useContext, useEffect, useState } from "react"
import categoriesService from "../../../../services/categoriesService.js"
import HomePageContext from "../../../Contexts/HomePageContext.jsx"


const CategoriesList = (props) => {
	const [contextData] = useContext(HomePageContext)
	console.log(contextData)
	const subCategories = contextData.subCategories

	return (
		subCategories
			? <section className={ styles.randomCategoriesCont }>
				<div className={ styles.randomCatsInnerCont }>
					{ subCategories.map(category => (
						<div className={ styles.randomCatsSingleCont } key={ category._id }>
							<h1 className={ styles.mainHeader }>{ category.name }</h1>
							<div className={ styles.innerRandom }>
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
			: null
	)
}

export default CategoriesList