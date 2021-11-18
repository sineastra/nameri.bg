import styles from "./ServiceSideCard.module.css"
import profileImg from "../../../assets/images/profile-pic1.webp"
import RatingBox from "../RatingBox/RatingBox.jsx"
import UserRatingHeading from "../UserRatingHeading/UserRatingHeading.jsx"


const ServiceSideCard = ({ service }) => {
	const userDataFromContext = {
		profileImg,
		fullName: 'Pesho Tumnoto',
		rating: 1.5,
		votedUsers: 100,
	}

	service = {
		prices: [
			{ text: 'Цена за гошо', price: 'По договаряне' },
			{ text: 'Цена за пешо', price: 1200 },
			{ text: 'Цена за сийка', price: 1600 },
		],
		reviews: [
			{
				rating: 5,
				text: 'Отлична работа. Хемороидите са болест мисля.',
				author: {
					profileImg,
					fullName: 'Pesho Tumnoto',
					rating: 1.5,
					votedUsers: 100,
				},
			},
			{
				rating: 1,
				text: 'Отлична работа. Хемороидите са болест мисля.Отлична работа. Хемороидите са болест мисля.Отлична работа. Хемороидите са болест мисля.',
				author: {
					profileImg,
					fullName: 'Pesho Tumnoto',
					rating: 1.5,
					votedUsers: 100,
				},
			},
			{
				rating: 2,
				text: 'Отлична работа. Хемороидите са болест мисля.',
				author: {
					profileImg,
					fullName: 'Pesho Tumnoto',
					rating: 1.5,
					votedUsers: 100,
				},
			},
			{
				rating: 3,
				text: 'Отлична работа. Хемороидите са болест мисля.Отлична работа. Хемороидите са болест мисля.Отлична работа. ' +
					'Хемороидите са болест мисля.Отлична работа. Хемороидите са болест мисля.',
				author: {
					profileImg,
					fullName: 'Pesho Tumnoto',
					rating: 1.5,
					votedUsers: 100,
				},
			},
		],
	}

	const reviewsForDisplay = service.reviews.sort((a, b) => a.price - b.price).slice(0, 3)

	return (
		<div className={ styles.mainFlexContainer }>

			<div className={ `${ styles.userInfo } ${ styles.mainFlexInnerContainer }` }>
				<div className={ styles.mainHeadingOuterWrapper }>
					<UserRatingHeading { ...{ user: userDataFromContext, showVotes: true } }/>
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
							{ service.prices.map(price => (
								<li className={ styles.priceItem }>{ price.text } - <span
									className={ styles.priceItemBold }>{ price.price }</span> { isNaN(price.price) ? '' : 'лв.' }
								</li>
							)) }
						</ul>
					</div>
				</div>
			</div>

			<div className={ `${ styles.ratingsInfo } ${ styles.mainFlexInnerContainer }` }>
				{ reviewsForDisplay.map(review => (
					<div className={ styles.reviewElem }>
						<div className={ styles.reviewInnerFlexItem }>
							<UserRatingHeading { ...{
								user: review.author,
								showVotes: false,
							} }/>
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