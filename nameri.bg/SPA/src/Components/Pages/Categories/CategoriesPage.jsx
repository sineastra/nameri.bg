import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx"
import styles from "./CategoryPage.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import categoriesService from "../../../services/categoriesService.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"


const CategoriesPage = (props) => {
	const { isLoadingData, data } = useFetch(() => categoriesService.getAll())
	const [filteredCats, setFilteredCats] = useState(null)

	//TODO: Can make this a custom hook.
	const onSearchSubmit = (e) => {
		e.preventDefault()

		const filtered = data.filter(x =>
			x.name.includes(e.target.value) || x.subcategories.some(y => y.name.includes(e.target.value)),
		)

		setFilteredCats(filtered)
	}

	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setFilteredCats(data)
		}
	}

	useEffect(() => {
		setFilteredCats(data)
	}, [data])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.outerSection }>
					<div className={ styles.innerSection }>
						<CategoriesPagesHeader
							categoryName={ "Всички Категории" }
							onSearchSubmit={ onSearchSubmit }
							onSearchChange={ onSearchChange }
						/>
						<section className={ styles.cardsWrapper }>
							{ filteredCats.length > 0
								? data.map(category => (
									<CategoryCard
										key={ category._id }
										_id={ category._id }
										categoryName={ category.name }
										categoryIcon={ category.icon }
										subCategories={ category.subcategories }
										className={ styles.categoryCard }
									/>
								))
								: <div className={ styles.noCatsWrapper }>
									<h1 className={ styles.noCatsHeader }>Няма открити подкатегории</h1>
								</div>
							}
						</section>
					</div>
				</section>
			</MainPageLayout>
	)
}

export default CategoriesPage