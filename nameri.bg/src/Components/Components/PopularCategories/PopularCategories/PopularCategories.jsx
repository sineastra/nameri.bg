import styles from "./PopularCategories.module.css"
import PopularCategoriesRow from "../PopularCategoriesRow/PopularCategoriesRow.jsx"


const PopularCategories = () => {
	return <section className={styles.popularCategoriesCont}>
		<div className={styles.headingsWrapper}>
			<h1 className={styles.mainHeader}>Популярни Категории</h1>
			<p className={styles.subHeader}>От дизайн на лого до поправка на оградата на баба ти
				Пенка - имаме всичко!</p>
		</div>
		<section className={styles.popularWrapper}>
			<PopularCategoriesRow wrapperClass={styles.popularCategories}/>
			<PopularCategoriesRow wrapperClass={styles.popularCategories}/>
		</section>
	</section>
}

export default PopularCategories