import styles from "./ListingSideCard.module.css"
import profileImg from "../../../assets/images/profile-pic1.webp"
import RatingBox from "../RatingBox/RatingBox.jsx"
import UserRatingHeading from "../UserRatingHeading/UserRatingHeading.jsx"


const ListingSideCard = ({ listing }) => {
	const reviewsForDisplay = listing.reviews.sort((a, b) => a.rating - b.rating).slice(0, 3)

	return (
		<div className={ styles.mainFlexContainer }>

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
					<button className={ styles.styledBtn }>
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

			<div className={ `${ styles.ratingsInfo } ${ styles.mainFlexInnerContainer }` }>
				{ reviewsForDisplay.map(review => (
					<div className={ styles.reviewElem } key={ review._id }>
						<div className={ styles.reviewInnerFlexItem }>
							<UserRatingHeading
								user={ review.user }
								showVotes={ false }
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