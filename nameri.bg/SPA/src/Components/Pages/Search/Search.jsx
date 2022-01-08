import { useSearchParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import userServices from "../../../services/userServices.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import styles from "./Search.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import UserCard from "../../Components/UserCard/UserCard.jsx"


const fetchData = async (params) => {
	const search = params.get('search')

	const [users, listings] = await Promise.all([userServices.search(search), listingsServices.search(search)])

	return { users, listings }
}

const Search = () => {
	const [params] = useSearchParams()
	const { isLoadingData, data } = useFetch(() => fetchData(params), [params])

	return (isLoadingData ? <Spinner/> : <MainPageLayout>
			<section className={ styles.wrapper }>
				<section className={ styles.contentSection }>
					<div className={ styles.usersInnerWrapper }>
						<h1 className={ styles.usersHeader }>Потребители</h1>
						{ data.users.length > 0 ? data.users.map(x => (
							<div className={ styles.userCardWrapper } key={ x._id }>
								<UserCard user={ x }/>
							</div>)) : <h1 className={ styles.noDataHeader }>Няма намерени потребители</h1> }
					</div>
				</section>
				<section className={ `${ styles.contentSection } ${ styles.listingsSection }` }>
					<h1 className={ styles.listingsHeader }>Обяви</h1>
					<div className={ styles.innerListingsDiv }>
						{ data.listings.length > 0 ? data.listings.map(x => (<ListingCard
								key={ x._id }
								listing={ x }
								className={ styles.listingCard }
								headingClassName={ styles.listingCardHeading }
								namesClassName={ styles.namesClassName }
								priceClassName={ styles.priceClassName }
								profilePicClassName={ styles.listingProfilePic }
							/>)) : <div className={ styles.noDataHeader }><h1 className={styles.noDataHeaderAlone}>Няма намерени обяви</h1></div> }
					</div>
				</section>
			</section>
		</MainPageLayout>

	)
}

export default Search