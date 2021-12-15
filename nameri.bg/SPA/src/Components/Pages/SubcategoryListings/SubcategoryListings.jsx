import styles from "./SubcategoryListings.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledLinkBtn/StyledBtn.jsx"
import categoriesService from "../../../services/categoriesService.js"
import { useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const SubcategoryListings = () => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => categoriesService.getSubCatListings(params.id, params))

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.mainWrapper }>
					<CategoriesPagesHeader categoryName={ data.name }/>
					<section className={ styles.servicesContainer }>
						{ data.listings.map(listing => (
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