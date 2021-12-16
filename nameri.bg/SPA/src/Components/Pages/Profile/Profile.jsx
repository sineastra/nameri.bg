import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useParams } from "react-router-dom"
import userServices from "../../../services/userServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const Profile = () => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => userServices.getUserForProfile(params.id, params))
	
	console.log(params)
	console.log(data)

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<section className={ styles.listingsSection }>
							{ data.listings.map(listing => (
								<ListingCard
									listing={ listing }
									user={ data }
									className={ styles.listingCard }
								/>))
							}
						</section>
						<div className={ styles.profileSideCardWrapper }>
							<ProfileSideCard user={ data }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default Profile