import styles from "./SubcategoryListings.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledLinkBtn/StyledBtn.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import { Link, useParams } from "react-router-dom"


const SubcategoryListings = () => {
	const [subcategory, setSubcategory] = useState()
	const params = useParams()

	useEffect(() => {
		// TODO: this is for refactoring into custom Hook
		const fetchData = async () => {
			const result = await categoriesService.getSubCatListings(params.id)

			console.log(result)

			setSubcategory(result)
		}

		fetchData()
	}, [params])

	return (
		subcategory
			? <MainPageLayout>
				<section className={ styles.mainWrapper }>
					<CategoriesPagesHeader categoryName={ subcategory.name }/>
					<section className={ styles.servicesContainer }>
						{ subcategory.listings.map(listing => (
							<ListingCard
								className={ styles.customerServiceCard }
								listing={ listing }
								user={ listing.user }
								key={ listing._id }
							/>
						)) }
					</section>
					<StyledBtn onClick={ () => {} } text="Зареди Още"/>
				</section>
			</MainPageLayout>
			: null
	)
}

export default SubcategoryListings