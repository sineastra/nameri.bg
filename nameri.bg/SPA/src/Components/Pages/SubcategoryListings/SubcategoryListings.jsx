import styles from "./SubcategoryListings.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CategoriesPagesHeader from "../../Components/CategoriesPagesHeader/CategoriesPagesHeader.jsx"
import StyledBtn from "../../Components/StyledLinkBtn/StyledBtn.jsx"
import categoriesService from "../../../services/categoriesService.js"
import { useParams, useSearchParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import { useEffect, useState } from "react"
import SpinnerSmall from "../../Components/SpinnerSmall/SpinnerSmall.jsx"


const SubcategoryListings = () => {
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams({})
	const [limit, setLimit] = useState(2)
	const [loadingPartially, setLoadingPartially] = useState(false)
	const [filteredList, setFilteredList] = useState([])
	const {
		isLoadingData, data,
	} = useFetch(() => categoriesService.getSubCatListings(params.id, searchParams), [searchParams], loadingPartially, setLoadingPartially)

	const loadMore = (e) => {
		e.preventDefault()

		setLimit(oldState => oldState + 2)
		setLoadingPartially(true)
	}

	//TODO: Can make this a custom hook.
	const onSearchSubmit = (e) => {
		e.preventDefault()
		const value = e.target.search.value

		const filtered = data.listings.filter(x => {
			return x.heading.includes(value)
				|| x.details.includes(value)
				|| x.town.name === value
				|| x.tags.some(tag => tag === value)
				|| x.user.nameAndSurname.includes(value)
				|| x.user.email.includes(value)
		})

		setFilteredList(filtered)
	}

	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setFilteredList(data.listings)
		}
	}

	useEffect(() => {
		setFilteredList(data.listings)
	}, [data])

	useEffect(() => {
		if (limit > 2) {
			searchParams.set('limit', limit)
			setSearchParams(searchParams)
		}
	}, [limit])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.mainWrapper }>
					<CategoriesPagesHeader
						categoryName={ data.name }
						onSearchSubmit={ onSearchSubmit }
						onSearchChange={ onSearchChange }/>
					<section className={ styles.servicesContainer }>
						{ filteredList.length > 0
							? filteredList.map(listing => (
								<ListingCard
									listing={ listing }
									user={ listing.user }
									key={ listing._id }
									className={ styles.listingClassName }
									headingClassName={ styles.listingHeading }
									profilePicClassName={ styles.listingProfilePic }
									priceClassName={ styles.priceClassName }
									namesClassName={ styles.namesClassName }
								/>))
							: <div className={ styles.noCatsWrapper }>
								<h1 className={ styles.noCatsHeader }>Няма открити обяви</h1>
							</div> }
					</section>
					{ filteredList.length > 0 && <div>
						{ loadingPartially ? <SpinnerSmall/> : <StyledBtn onClick={ loadMore } text="Зареди Още"/> }
					</div> }
				</section>
			</MainPageLayout>
	)
}

export default SubcategoryListings