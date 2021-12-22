import { useSearchParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import userServices from "../../../services/userServices.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import styles from "./Search.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import UsersList from "../../Components/UsersList/UsersList.jsx"


const fetchData = async (params) => {
	const search = params.get('search')

	const [users, listings] = await Promise.all([
		userServices.search(search),
		listingsServices.search(search),
	])

	return { users, listings }
}

const Search = () => {
	const [params] = useSearchParams()
	const { isLoadingData, data } = useFetch(() => fetchData(params), [params])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.wrapper }>
					<UsersList className={ styles.contentSection } users={ data.users } heading="Потребители"/>
					<section className={ `${ styles.contentSection } ${ styles.listingsSection }` }>
						<h1 className={ styles.header }>Обяви</h1>
						<div className={ styles.innerListingsDiv }>
							{ data.listings.map(x => (
								<ListingCard
									listing={ x }
									className={ styles.listingCard }
									headingClassName={ styles.listingCardHeading }
									namesClassName={ styles.namesClassName }
									priceClassName={ styles.priceClassName }
									profilePicClassName={ styles.listingProfilePic }
								/>
							)) }
						</div>
					</section>
				</section>
			</MainPageLayout>
	)
}

export default Search