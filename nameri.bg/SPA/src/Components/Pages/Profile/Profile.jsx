import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useParams } from "react-router-dom"
import userServices from "../../../services/userServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import MessageModal from "../../Components/MessageModal/MessageModal.jsx"
import { useContext, useState } from "react"
import ErrorContext from "../../Contexts/ErrorContext.jsx"


const Profile = () => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => userServices.getUserForProfile(params.id, params))
	const [errors, setErrors] = useContext(ErrorContext)
	const [modalVisible, setModalVisible] = useState(false)

	const closeModal = () =>
		setModalVisible(false)

	const openModal = () =>
		setModalVisible(true)

	const onSubmitModal = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		const response = await userServices.sendMessage(data._id, formDataObj)

		if (response.ok) {
			closeModal()
		} else {
			setErrors(response.errors)
		}
	}

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<MessageModal
					user={ data.nameAndSurname }
					onSubmit={ onSubmitModal }
					closeModal={ closeModal }
					backdropClassName={ modalVisible ? styles.visibleModal : styles.hiddenModal }
				/>
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
							<ProfileSideCard user={ data } openModal={ openModal }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default Profile