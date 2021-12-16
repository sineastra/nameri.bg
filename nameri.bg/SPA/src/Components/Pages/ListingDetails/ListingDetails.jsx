import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import { useParams } from "react-router-dom"
import listingsServices from "../../../services/listingsServices.js"
import styles from "./ListingDetails.module.css"
import Carousel from "../../Components/Carousel/Carousel.jsx"
import ListingSideCard from "../../Components/ListingSideCard/ListingSideCard.jsx"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const fetchData = async (id) => {
	const result = await listingsServices.getListingDetails(id)
	const images = result.listing.images.length === 0 ? [] : result.listing.images

	return {
		listing: { ...result.listing, images },
		similarListings: result.similar.slice(0, 3),
	}
}

const ListingDetails = (props) => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => fetchData(params.id))

	return (
		isLoadingData
			? <Spinner/>
			: < MainPageLayout>
				<section className={ styles.outerSection }>
					<h1 className={ styles.mainHeader }>{ data.listing.heading }</h1>
					<section className={ styles.mainSection }>
						<section className={ styles.carouselSection }>
							<Carousel imgData={ data.listing.images } imgsPerSlide={ 3 }/>
						</section>
						<section className={ styles.sideSection }>
							<ListingSideCard listing={ data.listing }/>
						</section>
					</section>

					<section className={ styles.serviceDetails }>
						<h1 className={ styles.detailsHeader }>Детайли за обявата</h1>
						<div className={ styles.innerDetails }>
							<p>
								{ data.listing.details }
							</p>
						</div>
					</section>

					<section className={ styles.similarServices }>
						{ data.similarListings.map(listing => (
							<ListingCard
								listing={ listing } user={ listing.user } className={ styles.similarService }
								key={ listing._id }/>
						)) }
					</section>
				</section>
			</MainPageLayout>
	)
}

export default ListingDetails