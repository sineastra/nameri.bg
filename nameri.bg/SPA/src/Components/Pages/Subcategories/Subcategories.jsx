import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const Subcategories = (props) => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => categoriesService.getSubCategories(params.id, params))

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<CategoriesPagesHeader categoryName={ data.name }/>
					<section className={ styles.subCatsInner }>
						{ data.subcategories.map(subCategory => (
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