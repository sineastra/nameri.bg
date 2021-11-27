import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"
import { useEffect, useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import { useNavigate, useParams } from "react-router-dom"


const Subcategories = (props) => {
	const [subCats, setSubCats] = useState([])
	const params = useParams()
	const navigate = useNavigate()

	useEffect(async () => {
		try {
			const result = await categoriesService.getSubCategories(params.id)

			setSubCats(result.subcategories)
		} catch (e) {
			navigate("/error", {
				state: {
					statusCode: e.statusCode,
					status: e.status,
				},
			})
		}
	}, [])

	return (
		<MainPageLayout>
			<div className={ styles.wrapper }>
				<CategoriesPagesHeader categoryName={ 'Субкатегория' }/>
				<section className={ styles.subCatsInner }>
					{ subCats.map(subCategory => (
						<div className={ styles.subCatCardWrapper }>
							<SubcategoryCard categoryName={ subCategory.name }
							                 subCatsCount={ subCategory.listings.length } key={ subCategory._id }/>
						</div>
					)) }
				</section>
			</div>
		</MainPageLayout>
	)
}

export default Subcategories