import styles from "./ServiceDetailsBig.module.css"
import Carousel from "../Carousel/Carousel.jsx"
import ServiceSideCard from "../ServiceSideCard/ServiceSideCard.jsx"
import ListingCard from "../ListingCard/ListingCard.jsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import listingsServices from "../../../services/listingsServices.js"


const ServiceDetailsBig = (props) => {
	const [data, setData] = useState({ listing: null, similarListings: null })
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const result = await listingsServices.getListingDetails(params.id)
			setData({
				listing: result.listing,
				similarListings: result.similar,
			})
		}

		fetchData()
	}, [])

	return (
		data.listing
			? <>
				<section className={ styles.mainSection }>
					<section className={ styles.carouselSection }>
						<Carousel data={ data.listing.images } imgsPerSlide={ 3 }/>
					</section>
					<section className={ styles.sideSection }>
						<ServiceSideCard listing={ data.listing }/>
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
					{ data.similarListings.map(x => (
						<ListingCard listing={ x } user={ x.user } className={ styles.similarService } key={ x._id }/>
					)) }
				</section>
			</>
			: null
	)
}

export default ServiceDetailsBig