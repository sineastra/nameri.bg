import styles from "./ListingDetailsBig.module.css"
import Carousel from "../Carousel/Carousel.jsx"
import ListingSideCard from "../ListingSideCard/ListingSideCard.jsx"
import ListingCard from "../ListingCard/ListingCard.jsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import listingsServices from "../../../services/listingsServices.js"


const ListingDetailsBig = (props) => {
	const [data, setData] = useState({ listing: null, similarListings: null })
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const result = await listingsServices.getListingDetails(params.id)

			setData({
				listing: result.listing,
				similarListings: result.similar.slice(0, 3),
			})
		}

		fetchData()
	}, [])

	return (
		data.listing
			? <section className={ styles.outerSection }>
				<h1 className={ styles.mainHeader }>{ data.listing.heading }</h1>
				<section className={ styles.mainSection }>
					<section className={ styles.carouselSection }>
						<Carousel data={ data.listing.images } imgsPerSlide={ 3 }/>
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
			: null
	)
}

export default ListingDetailsBig