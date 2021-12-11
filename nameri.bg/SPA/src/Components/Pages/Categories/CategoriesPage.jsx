import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx"
import styles from "./CategoryPage.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../services/categoriesService.js"


const CategoriesPage = (props) => {
	const [categories, setCategories] = useState()

	useEffect(() => {
		const fetchData = async () => {
			const data = await categoriesService.getAll()

			setCategories(data)
		}

		fetchData()
	}, [])

	return (
		categories ?
			<MainPageLayout>
				<section className={ styles.outerSection }>
					<div className={ styles.innerSection }>
						<CategoriesPagesHeader categoryName={ "Всички Категории" }/>
						<section className={ styles.cardsWrapper }>
							{ categories?.map(category => (
								<CategoryCard
									key={ category._id }
									_id={ category._id }
									categoryName={ category.name }
									categoryIcon={ category.icon }
									subCategories={ category.subcategories }
									className={ styles.categoryCard }
								/>
							)) }
						</section>
					</div>
				</section>
			</MainPageLayout>
			: null
	)
}

export default CategoriesPage