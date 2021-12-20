import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import { useEffect, useState } from "react"


const Subcategories = (props) => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => categoriesService.getSubCategories(params.id, params))
	const [filteredSubs, setFilteredSubs] = useState(null)

	const onSearchSubmit = (e) => {
		e.preventDefault()

		const filtered = data.subcategories.filter(x => x.name.includes(e.target.search.value))

		setFilteredSubs(filtered)
	}

	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setFilteredSubs(data.subcategories)
		}
	}

	useEffect(() => {
		setFilteredSubs(data.subcategories)
	}, [data])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<CategoriesPagesHeader
						categoryName={ data.name }
						onSearchSubmit={ onSearchSubmit }
						onSearchChange={ onSearchChange }
					/>
					<section className={ styles.subCatsInner }>
						{ filteredSubs.length > 0
							? filteredSubs.map(subCategory => (
								<div className={ styles.subCatCardWrapper } key={ subCategory._id }>
									<Link to={ `/categories/subcategories/${ subCategory._id }` } className={ styles.link }>
										<SubcategoryCard
											categoryName={ subCategory.name }
											subCatsCount={ subCategory.listings.length }
											className={ styles.subCategoryCard }
										/>
									</Link>
								</div>
							))
							: <div className={ styles.noCatsWrapper }>
								<h1 className={ styles.noCatsHeader }>Няма открити подкатегории</h1>
							</div>
						}
					</section>
				</div>
			</MainPageLayout>
	)
}

export default Subcategories