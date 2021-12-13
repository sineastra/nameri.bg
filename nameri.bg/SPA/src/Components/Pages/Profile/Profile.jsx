import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import userServices from "../../../services/userServices.js"


const Profile = () => {
	const params = useParams()
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = await userServices.getUserForProfile(params.id)

			setUserData(data)
		}

		fetchData()
	}, [])

	return (
		userData
			? <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<section className={ styles.servicesSection }>
							{ userData.listings.map(listing => (
								<ListingCard
									listing={ listing }
									user={ userData }
									className={ styles.serviceCard }
								/>))
							}
						</section>
						<div className={ styles.profileSideCardWrapper }>
							<ProfileSideCard user={ userData }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
			: null
	)
}

export default Profile