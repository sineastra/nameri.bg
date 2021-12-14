import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx"
import styles from "./CategoryPage.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import { useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const CategoriesPage = (props) => {
	const [categories, setCategories] = useState()

	const fetchData = async () => {
		const data = await categoriesService.getAll()

		setCategories(data)
	}

	const { isLoadingData } = useFetch(fetchData)

	return (
		isLoadingData ?
			<Spinner/>
			: <MainPageLayout>
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
	)
}

export default CategoriesPage