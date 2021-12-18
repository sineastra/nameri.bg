import styles from "./ListingSideCard.module.css"
import UserRatingHeading from "../UserRatingHeading/UserRatingHeading.jsx"
import { useContext, useState } from "react"
import TextModal from "../TextModal/TextModal.jsx"
import Rating from "../Rating/Rating.jsx"
import userServices from "../../../services/userServices.js"
import ErrorContext from "../../Contexts/ErrorContext.jsx"


const ListingSideCard = ({ listing, setData }) => {
	const reviewsForDisplay = listing.user.reviews.sort((a, b) => a.rating - b.rating).slice(0, 3)
	const [modalVisible, setModalVisible] = useState(false)
	const [rating, setRating] = useState(0)
	const [hoverRating, setHoverRating] = useState(0)
	const [_, setErrors] = useContext(ErrorContext)
	const ratings = [1, 2, 3, 4, 5]

	const addRating = (rating) => {
		setHoverRating(rating)
	}

	const pickRating = (rating) => {
		setRating(rating)
		setHoverRating(rating)
	}

	const onMouseLeave = () => {
		if (pickRating === 0) {
			setHoverRating(0)
		} else {
			setHoverRating(rating)
		}
	}

	const closeModal = () =>
		setModalVisible(false)

	const sendReview = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const message = formData.get('message')

		const reviewData = {
			reviewText: message,
			reviewRating: rating,
		}

		const response = await userServices.addReview(reviewData, listing.user._id, listing._id)

		if (response.ok) {
			setData(oldData => ({ ...oldData, listing: response.data }))
			closeModal()
		} else {
			setErrors({ msg: response.msg })
		}
	}

	return (
		<div className={ styles.mainFlexContainer }>
			<TextModal
				onSubmit={ sendReview }
				closeModal={ closeModal }
				subHeader={ <Rating
					addRating={ addRating }
					pickRating={ pickRating }
					onMouseLeave={ onMouseLeave }
					hoverRating={ hoverRating }
					ratings={ ratings }
				/> }
				header="Оцени потребител"
				placeholder="Напиши твоето ревю (Не е задължително)..."
				backdropClassName={ styles.ratingModal }
				setVisibleState={ setModalVisible }
				visibleState={ modalVisible }
				wrapperClassName={ styles.modalWrapper }
			/>

			<div className={ `${ styles.userInfo } ${ styles.mainFlexInnerContainer }` }>
				<div className={ styles.mainHeadingOuterWrapper }>
					<UserRatingHeading
						user={ listing.user }
						showVotes={ true }
						profileImgClassName={ styles.profileImgClass }
						headingClassName={ styles.userNames }
						ratingBoxWrapper={ styles.ratingBoxWrapper }
						wrapperClassName={ styles.userWrapper }
					/>
				</div>
				<div className={ styles.userInfoBtnsWrapper }>
					<button className={ styles.styledBtn } onClick={ () => setModalVisible(true) }>
						Оцени
					</button>
					<button className={ styles.styledBtn }>
						Щепсели (Контакти)
					</button>
				</div>
			</div>

			<div className={ `${ styles.pricesInfoWrapper }` }>
				<h1 className={ styles.pricesWrapperHeading }>Колко ще ми струва: </h1>
				<div className={ styles.pricesInfoOuter }>
					<div className={ styles.pricesInfoInner }>
						<div className={ styles.priceItem }>{ listing.price } лв.
							{/*<span className={ styles.priceItemBold }>{ price }</span> { isNaN(price.price) ? '' : 'лв.' }*/ }
						</div>
					</div>
				</div>
			</div>

			<div className={ `${ styles.ratingsInfo }` }>
				{ reviewsForDisplay.map(review => (
					<div className={ styles.reviewElem } key={ review._id }>
						<div className={ styles.reviewInnerFlexItem }>
							<UserRatingHeading
								user={ review.user }
								showVotes={ false }
								wrapperClassName={ styles.userHeadingWrapper }
							/>
						</div>
						<div
							className={ `${ styles.reviewInnerFlexItem } ${ styles.reviewInnerTextItem }` }><span
							className={ styles.overflowSpan }>{ review.text }</span></div>
					</div>
				)) }
			</div>
		</div>
	)
}

export default ListingSideCard