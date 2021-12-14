import styles from "./SubcategoryListings.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledLinkBtn/StyledBtn.jsx"
import { useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import { useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const SubcategoryListings = () => {
	const [subcategory, setSubcategory] = useState({})
	const params = useParams()

	const fetchData = async () => {
		const result = await categoriesService.getSubCatListings(params.id)

		setSubcategory(result)
	}

	const { isLoadingData } = useFetch(fetchData)

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
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
	)
}

export default SubcategoryListings