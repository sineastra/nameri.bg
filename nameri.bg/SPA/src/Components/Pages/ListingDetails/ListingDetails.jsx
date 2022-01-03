import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import listingsServices from "../../../services/listingsServices.js"
import styles from "./ListingDetails.module.css"
import Carousel from "../../Components/Carousel/Carousel.jsx"
import ListingSideCard from "../../Components/ListingSideCard/ListingSideCard.jsx"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import { useContext, useEffect, useState } from "react"
import StyledBtn from "../../Components/StyledBtn/StyledBtn.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import { GoLocation } from "react-icons/go"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


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
	const navigate = useNavigate()
	const [loggedUser] = useContext(UserContext)
	const { processRequest } = useContext(UtilityContext)
	const { isLoadingData, data, setData } = useFetch(() => fetchData(params.id), [params.id])
	const [images, setImages] = useState([])

	const deleteListing = async () => {
		const confirm = window.confirm('Сигурен ли си че искаш да изтриеш обявата?')

		if (confirm) {
			await processRequest(() => listingsServices.deleteListing(data.listing._id))
			navigate(`/profile/${ loggedUser._id }`)
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [params.id])

	useEffect(() => {
		if (data && data.listing) {
			const images = data.listing.images.length > 0
				? data.listing.images.map(x => {
					const img = new Image()

					img.src = x

					return img
				})
				: [{ src: '/Default-cover.svg' }]

			setImages(images)
		}
	}, [data])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.outerSection }>
					<h1 className={ styles.mainHeader }>{ data.listing.heading }</h1>
					<section className={ styles.mainSection }>
						<section className={ styles.carouselSection }>
							<Carousel imgData={ images } imgsPerSlide={ 3 } className={styles.carouselOuterClassName}/>
						</section>
						<section className={ styles.sideSection }>
							<ListingSideCard listing={ data.listing } setData={ setData }/>
						</section>
					</section>

					<section className={ styles.serviceDetails }>
						<h1 className={ styles.detailsHeader }>Детайли за обявата</h1>
						<div className={ styles.innerDetails }>
							<p>
								{ data.listing.details }
							</p>
							<div className={ styles.townName }>
								<GoLocation/>
								<h4 className={ styles.townNameHeader }>{ data.listing.town.name }</h4>
							</div>
						</div>
					</section>

					{ (loggedUser && loggedUser._id === data.listing.user._id) &&
						<div className={ styles.listingActionsBtns }>
							<div className={ styles.listingActionsInner }>
								<Link to={ `/edit-listing/${ data.listing._id }` } className={ styles.editBtnLink }>
									<StyledBtn className={ styles.editListingBtn }>Редактирай</StyledBtn>
								</Link>
								<StyledBtn
									className={ styles.deleteListingBtn }
									onClick={ deleteListing }>Изтрий обявата
								</StyledBtn>
							</div>
						</div>
					}


					{ data.similarListings.length > 0
						? <section className={ styles.similarListingsWrapper }>
							<h1 className={ styles.similarListingsHeader }>Подобни обяви</h1>
							<div className={ styles.similarListings }>
								{ data.similarListings.map(listing => (
									<ListingCard
										listing={ listing }
										user={ listing.user }
										className={ styles.similarListing }
										key={ listing._id }
										profilePicClassName={ styles.listingProfilePic }
										priceClassName={ styles.priceClassName }
										namesClassName={ styles.namesClassName }
										headingClassName={ styles.listingHeading }
									/>
								)) }
							</div>
						</section>
						: <h1 className={ `${ styles.mainHeader } ${ styles.noSimilarListings }` }>Няма подобни обяви</h1>
					}
				</section>
			</MainPageLayout>
	)
}

export default ListingDetails