import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./Profile.module.css"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"
import ProfileSideCard from "../../Components/ProfileSideCard/ProfileSideCard.jsx"
import { useNavigate, useParams } from "react-router-dom"
import userServices from "../../../services/userServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import TextModal from "../../Components/TextModal/TextModal.jsx"
import { useContext, useEffect, useState } from "react"
import SoftErrorsContext from "../../Contexts/SoftErrorsContext.jsx"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"


const MessageSubHeader = ({ userName }) =>
	<>
		Съобщение до: <span className={ styles.userNameSpan }>{ userName }</span>
	</>

const Profile = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { isLoadingData, data } = useFetch(() => userServices.getUserForProfile(params.id), [params.id])
	const [, setContextErrors] = useContext(SoftErrorsContext)
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	const sendMsg = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		const response = await userServices.sendMessage(data._id, formDataObj)

		if (response.ok) {
			setModalVisible(false)
			e.target.message.value = ''

			navigate("/messages", { state: { conversationId: response.data.conversationId } })
		} else {
			setContextErrors(extractErrorMessages(response.errors))
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
						<div className={ styles.listingsOuterWrapper }>
							<h1 className={ styles.listingsHeader }>Обяви на { data.nameAndSurname }</h1>
							<section className={ styles.listingsSection }>
								{ data.listings.length > 0
									? data.listings.map(listing => (
										<ListingCard
											key={ listing._id }
											listing={ { ...listing, user: data } }
											className={ styles.listingCard }
											profilePicClassName={ styles.listingProfilePic }
											priceClassName={ styles.priceClassName }
											namesClassName={ styles.namesClassName }
											headingClassName={ styles.headingClassName }
										/>))
									: <div className={ styles.noListingsHeader }>Няма намерени обяви</div>
								}
							</section>
						</div>
						<div className={ styles.profileSideCardWrapper }>
							<ProfileSideCard user={ data } openModal={ () => setModalVisible(true) }/>
						</div>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default Profile