import styles from "./PopularCategories.module.css"
import { useEffect, useState } from "react"
import categoriesService from "../../../../services/categoriesService.js"
import SingleCategory from "../SingleCategory/SingleCategory.jsx"


const PopularCategories = (props) => {
	const [popularCategories, setPopular] = useState([])

	useEffect(async () => {
		let popular = await categoriesService.getPopular(8)

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
				{ popularCategories.map(x => (
					<SingleCategory img={ x.img } name={ x.name } key={ x._id } _id={ x._id }
					                className={ styles.singleCategoryClass }/>
				)) }
			</section>

		</section>
	)
}

export default PopularCategories