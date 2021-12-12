import styles from "./ProfileSection.module.css"
import ProfileSideCard from "../ProfileSideCard/ProfileSideCard.jsx"
import ListingCard from "../ListingCard/ListingCard.jsx"
import { useEffect, useState } from "react"
import listingsServices from "../../../services/listingsServices.js"
import userServices from "../../../services/userServices.js"
import { useParams } from "react-router-dom"


const ProfileSection = () => {
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
			? <div className={ styles.mainWrapper }>
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
			: null
	)
}

export default ProfileSection