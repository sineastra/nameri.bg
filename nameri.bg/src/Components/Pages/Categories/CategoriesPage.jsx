import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import healthBeauty from "../../../assets/images/healthBeauty.png"
import digitalServices from "../../../assets/images/digitalServices.jpg"
import constructionServices from "../../../assets/images/construction.png"
import autoServices from "../../../assets/images/auto-service-3073377-2553276.png"
import CategoryCard from "../../Components/CategoryCard/CategoryCard.jsx"
import styles from "./CategoryPage.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"


const fakeDbData = [
	{
		categoryName: 'Здраве и Грознота',
		categoryImg: healthBeauty,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Дигитални Услуги',
		categoryImg: digitalServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Ремонт и Строителство',
		categoryImg: constructionServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Авто Услуги',
		categoryImg: autoServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Здраве и Грознота',
		categoryImg: healthBeauty,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Дигитални Услуги',
		categoryImg: digitalServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Ремонт и Строителство',
		categoryImg: constructionServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Авто Услуги',
		categoryImg: autoServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Здраве и Грознота',
		categoryImg: healthBeauty,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Дигитални Услуги',
		categoryImg: digitalServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Ремонт и Строителство',
		categoryImg: constructionServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Авто Услуги',
		categoryImg: autoServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Здраве и Грознота',
		categoryImg: healthBeauty,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Дигитални Услуги',
		categoryImg: digitalServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Ремонт и Строителство',
		categoryImg: constructionServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Авто Услуги',
		categoryImg: autoServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Здраве и Грознота',
		categoryImg: healthBeauty,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Дигитални Услуги',
		categoryImg: digitalServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Ремонт и Строителство',
		categoryImg: constructionServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
	{
		categoryName: 'Авто Услуги',
		categoryImg: autoServices,
		subcategories: ['КИНЕЗИТЕРАПЕВТ', 'КОЗМЕТИК', 'МАНИКЮРИСТ', 'МАСАЖИСТ', 'ПСИХОЛОГ', 'ПСИХОТЕРАПЕВТ', 'РЕХАБИЛИТАТОР'],
	},
]

const CategoriesPage = (props) => {
	return (
		<MainPageLayout>
			<section className={styles.outerSection}>
				<div className={styles.innerSection}>
					<CategoriesPagesHeader categoryName={"Всички Категории"} className={styles.headingWrapper}/>
					<section className={styles.cardsWrapper}>
						{fakeDbData.map(x => (
							<CategoryCard key={x.categoryName} categoryName={x.categoryName} categoryImg={x.categoryImg}
							              subCategories={x.subcategories} className={styles.categoryCard}/>
						))}
					</section>
				</div>
			</section>
		</MainPageLayout>
	)
}

export default CategoriesPage