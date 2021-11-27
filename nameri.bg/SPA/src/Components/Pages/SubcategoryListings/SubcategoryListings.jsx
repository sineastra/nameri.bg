import profilePic1 from "../../../assets/images/profile-pic1.webp"
import profilePic2 from "../../../assets/images/profile-pic2.webp"
import profilePic3 from "../../../assets/images/profile-pic3.webp"
import serviceImg1 from "../../../assets/images/service1.png"
import serviceImg2 from "../../../assets/images/service2.jpg"
import serviceImg3 from "../../../assets/images/service3.jpg"
import styles from "./SubcategoryListings.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledLinkBtn/StyledBtn.jsx"
import { useEffect, useState } from "react"
import listingsServices from "../../../services/listingsServices.js"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useParams } from "react-router-dom"


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

const SubcategoryListings = () => {
	const [subcategory, setSubcategory] = useState()
	const params = useParams()

	useEffect(() => {
		// TODO: this is for refactoring into custom Hook
		const fetchData = async () => {
			const result = await categoriesService.getSubCatListings(params.id)

			setSubcategory(result)
		}

		fetchData()
	}, [params])

	return (
		subcategory
			? <MainPageLayout>
				<section className={ styles.wrapper }>
					<CategoriesPagesHeader categoryName={ subcategory.name }/>
					<section className={ styles.servicesContainer }>
						{ subcategory.listings.map(listing => (
							<Link to={ `/details/${ listing._id }` } key={ listing._id }>
								<ListingCard
									className={ styles.customerServiceCard }
									listing={ listing }
									user={ listing.user }
								/>
							</Link>
						)) }
					</section>
					<StyledBtn onClick={ () => {} } text="Зареди Още"/>
				</section>
			</MainPageLayout>
			: null
	)
}

export default SubcategoryListings