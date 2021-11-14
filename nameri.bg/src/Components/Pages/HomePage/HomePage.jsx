import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import HeadPageBanner from "../../Components/HeadPageBanner/HeadPageBanner.jsx"
import PopularCategories from "../../Components/PopularCategories/PopularCategories/PopularCategories.jsx"
import styles from "./HomePage.module.css"
import SingleCategory from "../../Components/SingleCategory/SingleCategory.jsx"


const fakeCategoriesData = [{
	name: 'Яката Категория',
	records: [
		{ id: 1, name: 'Siika service', services: 25 },
		{ id: 2, name: 'Pesho service', services: 25 },
		{ id: 3, name: 'Gosho e tuka', services: 25 },
		{ id: 4, name: 'Dqdo Joco', services: 25 },
		{ id: 5, name: 'Baba Petranka', services: 25 },
		{ id: 6, name: 'Tocko feshuna', services: 25 },
		// { id: 13, name: 'Toaletna Priqtna', services: 25 },
	],
}, {
	name: 'Не-яката Категория',
	records: [
		{ id: 7, name: 'Mocka Filma', services: 25 },
		{ id: 8, name: 'Nina Dogodina', services: 25 },
		{ id: 9, name: 'Ofri Bofri', services: 25 },
		{ id: 10, name: 'Kina Kamina', services: 25 },
		{ id: 11, name: 'Flavamed Imamed', services: 25 },
		{ id: 12, name: 'Ogledalo vOdqlo', services: 25 },
		{ id: 13, name: 'Toaletna Priqtna', services: 25 },
	],
},
]

const HomePage = () => {

	return (
		<MainPageLayout>
			<HeadPageBanner/>
			<main>

				{/*START OF POPULAR CATEGORIES SECTION*/}
				<section className={styles.popularCategoriesCont}>
					<div className={styles.headingsWrapper}>
						<h1 className={styles.mainHeader}>Популярни Категории</h1>
						<p className={styles.subHeader}>От дизайн на лого до поправка на оградата на баба ти
							Пенка - имаме всичко!</p>
					</div>
					<section className={styles.popularWrapper}>
						<PopularCategories wrapperClass={styles.popularCategories}/>
						<PopularCategories wrapperClass={styles.popularCategories}/>
					</section>
				</section>
				{/*END OF POPULAR CATEGORIES SECTION*/}

				{/* START OF SMALL CATEGORIES SECTION*/}
				<section className={styles.randomCategoriesCont}>
					<div className={styles.randomCatsInnerCont}>
						{fakeCategoriesData.map(x => (
							<div className={styles.randomCatsSingleCont}>
								<h1 className={styles.mainHeader}>{x.name}</h1>
								<div className={styles.innerRandom} key={x.name}>
									{x.records.map(y => (
										<SingleCategory key={y.id} categoryName={y.name} servicesCount={y.services}
										                className={`${styles.singleCat} ${styles.subHeader}`}/>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
				{/* END OF SMALL CATEGORIES SECTION*/}

			</main>
			<section>
				BANNER NA SAITA
			</section>
		</MainPageLayout>
	)
}

export default HomePage