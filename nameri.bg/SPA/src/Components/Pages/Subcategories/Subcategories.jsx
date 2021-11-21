import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import SubcategoryCard from "../../Components/SubcategoryCard/SubcategoryCard.jsx"
import styles from "./Subcategories.module.css"


const fakeSubCats = [
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
	{
		name: "Субкатегория",
		subCount: 25,
	},
]

const Subcategories = () => {

	return (
		<MainPageLayout>
			<div className={styles.wrapper}>
				<CategoriesPagesHeader categoryName={'Субкатегория'}/>
				<section className={styles.subCatsInner}>
					{fakeSubCats.map(x => (
						<div className={styles.subCatCardWrapper}>
							<SubcategoryCard categoryName={x.name} subCatsCount={x.subCount} key={x.name}/>
						</div>
					))}
				</section>
			</div>
		</MainPageLayout>
	)
}

export default Subcategories