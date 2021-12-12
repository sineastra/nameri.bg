import styles from "./ListingCard.module.css"
import { Link } from "react-router-dom"


const ListingCard = ({ className, listing, user }) => {
	const profileImg = listing.user.profileImg === "" ? "profile.svg" : listing.user.profileImg

	return (

		<div className={ `${ styles.outerWrapper } ${ className }` }>
			<Link to={ `/details/${ listing._id }` } className={ styles.imageWrapper }>
				<img src={ listing.mainImg } alt="Service Main Image" className={ styles.serviceImg }/>
				<div className={ `${ styles.comfortaa } ${ styles.townDiv }` }>
					{ listing.town.name }
				</div>
			</Link>
			<Link to={ `/details/${ listing._id }` } className={ styles.serviceHeading }>{ listing.heading }</Link>
			<div className={ styles.profileInfoWrapper }>
				<Link to={ `/profile/${ user._id }` } className={ styles.profileImageWrapper }>
					<img src={ `/${ profileImg }` } alt="" className={ styles.profilePic }/>
					<div className={ `${ styles.comfortaa } ${ styles.nameAndSurname }` }>{ user.nameAndSurname }</div>
				</Link>
				<div className={ styles.priceE }>{ listing.prices[0] } лв.</div>
			</div>
		</div>
	)
}

export default ListingCard