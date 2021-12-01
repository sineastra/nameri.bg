import styles from "./ProfileSection.module.css"
import ProfileSideCard from "../ProfileSideCard/ProfileSideCard.jsx"
import ListingCard from "../ListingCard/ListingCard.jsx"
import { useEffect, useState } from "react"
import listingsServices from "../../../services/listingsServices.js"
import userServices from "../../../services/userServices.js"
import { useParams } from "react-router-dom"


const ProfileSection = () => {
	const params = useParams()
	const [state, setState] = useState({ user: null, listings: [] })
	console.log(state)

	useEffect(() => {
		const fetchData = async () => {
			const user = await userServices.getUser(params.id)
			const listings = await listingsServices.getUserListings(user._id)

			setState({ user, listings })
		}

		fetchData()
	}, [])

	return (
		state.user
			? <div className={ styles.mainWrapper }>
				<div className={ styles.innerWrapper }>
					<section className={ styles.servicesSection }>
						{ state.listings.map(listing => (
							<ListingCard
								listing={ listing }
								user={ state.user }
								className={ styles.serviceCard }
							/>))
						}
					</section>
					<div className={ styles.profileSideCardWrapper }>
						<ProfileSideCard user={ state.user }/>
					</div>
				</div>
			</div>
			: null
	)
}

export default ProfileSection