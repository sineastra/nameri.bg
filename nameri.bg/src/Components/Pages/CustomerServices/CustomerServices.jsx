import profilePic1 from "../../../assets/images/profile-pic1.webp"
import profilePic2 from "../../../assets/images/profile-pic2.webp"
import profilePic3 from "../../../assets/images/profile-pic3.webp"
import serviceImg1 from "../../../assets/images/service1.png"
import serviceImg2 from "../../../assets/images/service2.jpg"
import serviceImg3 from "../../../assets/images/service3.jpg"
import styles from "./CustomerServices.module.css"
import CustomerServiceCard from "../../Components/CustomerServiceCard/CustomerServiceCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledBtn/StyledBtn.jsx"


const fakeData = [
	{
		user: { fullName: 'Потребителя Пенка', profilePic: profilePic1 },
		service: { town: 'Пешово', цена: 40, title: "Дръвчета за садене", mainImg: serviceImg1 },
	},
	{
		user: { fullName: 'Потребителя Пешо', profilePic: profilePic2 },
		service: { town: 'Гошово', цена: 140, title: "Семки за льопане", mainImg: serviceImg2 },
	},
	{
		user: { fullName: 'Непотребния Йоцо', profilePic: profilePic3 },
		service: { town: 'Яифос', цена: 'По Договаряне', title: "Булки за женене", mainImg: serviceImg3 },
	},
	{
		user: { fullName: 'Потребителя Пенка', profilePic: profilePic1 },
		service: { town: 'Пешово', цена: 40, title: "Дръвчета за садене", mainImg: serviceImg1 },
	},
	{
		user: { fullName: 'Потребителя Пешо', profilePic: profilePic2 },
		service: { town: 'Гошово', цена: 140, title: "Семки за льопане", mainImg: serviceImg2 },
	},
	{
		user: { fullName: 'Непотребния Йоцо', profilePic: profilePic3 },
		service: { town: 'Яифос', цена: 'По Договаряне', title: "Булки за женене", mainImg: serviceImg3 },
	},
	{
		user: { fullName: 'Потребителя Пенка', profilePic: profilePic1 },
		service: { town: 'Пешово', цена: 40, title: "Дръвчета за садене", mainImg: serviceImg1 },
	},
	{
		user: { fullName: 'Потребителя Пешо', profilePic: profilePic2 },
		service: { town: 'Гошово', цена: 140, title: "Семки за льопане", mainImg: serviceImg2 },
	},
	{
		user: { fullName: 'Непотребния Йоцо', profilePic: profilePic3 },
		service: { town: 'Яифос', цена: 'По Договаряне', title: "Булки за женене", mainImg: serviceImg3 },
	},
]

const CustomerServices = () => {
	return (
		<MainPageLayout>
			<section className={styles.wrapper}>
				<CategoriesPagesHeader categoryName="Субкатегория"/>
				<section className={styles.servicesContainer}>
					{fakeData.map(x => (
						<CustomerServiceCard user={x.user} service={x.service} className={styles.customerServiceCard}/>
					))}
				</section>
				<StyledBtn onClick={() => {}} text="Зареди Още"/>
			</section>
		</MainPageLayout>
	)
}

export default CustomerServices