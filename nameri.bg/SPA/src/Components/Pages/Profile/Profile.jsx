import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useParams } from "react-router-dom"
import userServices from "../../../services/userServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import TextModal from "../../Components/TextModal/TextModal.jsx"
import { useContext, useState } from "react"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"


const MessageSubHeader = ({ userName }) =>
	<>
		Съобщение до: <span className={ styles.userNameSpan }>{ userName }</span>
	</>

const Profile = () => {
	const params = useParams()
	const { isLoadingData, data } = useFetch(() => userServices.getUserForProfile(params.id, params))
	const [errors, setErrors] = useContext(ErrorContext)
	const [modalVisible, setModalVisible] = useState(false)

	const sendMsg = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		const response = await userServices.sendMessage(data._id, formDataObj)

		if (response.ok) {
			setModalVisible(false)
		} else {
			setErrors(extractErrorMessages(response.errors))
		}
	}

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<TextModal
					onSubmit={ sendMsg }
					closeModal={ () => setModalVisible(false) }
					subHeader={ <MessageSubHeader userName={ data.nameAndSurname }/> }
					header={ "Напиши съобщение" }
					placeholder="Напиши твоето съобщение..."
					backdropClassName={ styles.messageModal }
					visibleState={ modalVisible }
					setVisibleState={ setModalVisible }
					wrapperClassName={ styles.modalWrapper }
				/>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<section className={ styles.listingsSection }>
							{ data.listings.map(listing => (
								<ListingCard
									listing={ { ...listing, user: data } }
									className={ styles.listingCard }
								/>))
							}
						</section>
						<div className={ styles.profileSideCardWrapper }>
							<ProfileSideCard user={ data } openModal={ () => setModalVisible(true) }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default Profile