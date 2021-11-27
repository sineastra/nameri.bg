import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"
import { useEffect, useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useNavigate, useParams } from "react-router-dom"


const Subcategories = (props) => {
	const [category, setCategory] = useState()
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await categoriesService.getSubCategories(params.id)

				setCategory(result)
			} catch (e) {
				navigate("/error", {
					state: {
						statusCode: e.statusCode,
						status: e.status,
					},
				})
			}
		}

		fetchData()
	}, [params])

	return (
		category
			? <MainPageLayout>
				<div className={ styles.wrapper }>
					<CategoriesPagesHeader categoryName={ category.name }/>
					<section className={ styles.subCatsInner }>
						{ category.subcategories.map(subCategory => (
							<div className={ styles.subCatCardWrapper } key={ subCategory._id }>
								<Link to={ `/categories/subcategories/${ subCategory._id }` }>
									<SubcategoryCard
										categoryName={ subCategory.name }
										subCatsCount={ subCategory.listings.length }
									/>
								</Link>
							</div>
						)) }
					</section>
				</div>
			</MainPageLayout>
			: null

	)
}

export default Subcategories