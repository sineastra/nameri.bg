import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useParams } from "react-router-dom"
import { useState } from "react"
import userServices from "../../../services/userServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const Profile = () => {
	const params = useParams()
	const [userData, setUserData] = useState(null)

	const fetchData = async () => {
		const data = await userServices.getUserForProfile(params.id)

		setUserData(data)
	}

	const { isLoadingData } = useFetch(fetchData)

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<section className={ styles.listingsSection }>
							{ userData.listings.map(listing => (
								<ListingCard
									listing={ listing }
									user={ userData }
									className={ styles.listingCard }
								/>))
							}
						</section>
						<div className={ styles.profileSideCardWrapper }>
							<ProfileSideCard user={ userData }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default Profile