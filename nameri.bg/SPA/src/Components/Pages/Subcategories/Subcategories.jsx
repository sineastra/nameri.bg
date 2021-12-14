import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"
import { useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const Subcategories = (props) => {
	const [category, setCategory] = useState({})
	const params = useParams()

	const fetchData = async () => {
		const result = await categoriesService.getSubCategories(params.id)

		setCategory(result)
	}

	const { isLoadingData } = useFetch(fetchData)

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<CategoriesPagesHeader categoryName={ category.name }/>
					<section className={ styles.subCatsInner }>
						{ category.subcategories.map(subCategory => (
							<div className={ styles.subCatCardWrapper } key={ subCategory._id }>
								<Link to={ `/categories/subcategories/${ subCategory._id }` } className={ styles.link }>
									<SubcategoryCard
										categoryName={ subCategory.name }
										subCatsCount={ subCategory.listings.length }
										className={ styles.subCategoryCard }
									/>
								</Link>
							</div>
						)) }
					</section>
				</div>
			</MainPageLayout>
	)
}

export default Subcategories