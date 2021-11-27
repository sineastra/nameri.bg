import styles from "./ServiceSideCard.module.css"
import profileImg from "../../../assets/images/profile-pic1.webp"
import RatingBox from "../RatingBox/RatingBox.jsx"
import UserRatingHeading from "../UserRatingHeading/UserRatingHeading.jsx"


const ServiceSideCard = ({ listing }) => {
	const reviewsForDisplay = listing.reviews.sort((a, b) => a.rating - b.rating).slice(0, 3)
	console.log(listing, reviewsForDisplay)

	return (
		<div className={ styles.mainFlexContainer }>

			<div className={ `${ styles.userInfo } ${ styles.mainFlexInnerContainer }` }>
				<div className={ styles.mainHeadingOuterWrapper }>
					<UserRatingHeading user={ listing.user } showVotes={ true }/>
				</div>
				<div className={ styles.userInfoBtnsWrapper }>
					<button className={ `${ styles.styledBtn } ${ styles.ratingBtn }` }>
						Оцени
					</button>
					<button className={ `${ styles.styledBtn } ${ styles.contactBtn }` }>
						Щепсели
					</button>
				</div>
			</div>

			<div className={ `${ styles.pricesInfoWrapper } ${ styles.mainFlexInnerContainer }` }>
				<h1 className={ styles.pricesWrapperHeading }>Колко ще ми струва: </h1>
				<div className={ styles.pricesInfoOuter }>
					<div className={ styles.pricesInfoInner }>
						<ul>
							{ listing.prices.map((price, i) => (
								<li className={ styles.priceItem } key={ i }>{ price.text } - <span
									className={ styles.priceItemBold }>{ price.price }</span> { isNaN(price.price) ? '' : 'лв.' }
								</li>
							)) }
						</ul>
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

export default ServiceSideCard