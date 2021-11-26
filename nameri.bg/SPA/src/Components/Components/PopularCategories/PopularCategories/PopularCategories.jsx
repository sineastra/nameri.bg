import styles from "./PopularCategories.module.css"
import PopularCategoriesRow from "../PopularCategoriesRow/PopularCategoriesRow.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../../services/categoriesService.js"


const PopularCategories = (props) => {
	const [popularCategories, setPopular] = useState([])

	useEffect(async () => {
		let popular = await categoriesService.getPopular(8)
		popular = [popular.slice(0, 4), popular.slice(4)]

		setPopular(popular)
	}, [])

	return (
		<section className={ styles.popularCategoriesCont }>

			<div className={ styles.headingsWrapper }>
				<h1 className={ styles.mainHeader }>Популярни Категории</h1>
				<p className={ styles.subHeader }>От дизайн на лого до поправка на оградата на баба ти
					Пенка - имаме всичко!</p>
			</div>

			<section className={ styles.popularWrapper }>
				{ popularCategories.map(categoryData => (
					<PopularCategoriesRow
						wrapperClass={ styles.popularCategories }
						data={ categoryData }
						key={ categoryData[0]._id }/>
				)) }
			</section>

		</section>
	)
}

export default PopularCategories