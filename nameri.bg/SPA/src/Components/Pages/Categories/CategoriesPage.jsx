import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx"
import styles from "./CategoryPage.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import categoriesService from "../../../services/categoriesService.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const CategoriesPage = (props) => {
	const { isLoadingData, data } = useFetch(() => categoriesService.getAll())

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.outerSection }>
					<div className={ styles.innerSection }>
						<CategoriesPagesHeader categoryName={ "Всички Категории" }/>
						<section className={ styles.cardsWrapper }>
							{ data?.map(category => (
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