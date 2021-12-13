import styles from "./PopularCategories.module.css"
import SingleCategory from "../SingleCategory/SingleCategory.jsx"
import { useContext } from "react"
import HomePageContext from "../../../Contexts/HomePageContext.jsx"


const PopularCategories = (props) => {
	const [contextData] = useContext(HomePageContext)
	const popularCategories = contextData.popularCategories

	return (
		popularCategories
			? <section className={ styles.popularCategoriesCont }>

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
			: null
	)
}

export default PopularCategories