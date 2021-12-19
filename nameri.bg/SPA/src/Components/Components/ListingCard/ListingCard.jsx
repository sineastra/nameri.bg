import styles from "./ListingCard.module.css"
import { Link } from "react-router-dom"
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const ListingCard = ({ className, headingClassName, profilePicClassName, priceClassName, listing }) => {
	const [imgLoaded, setImgLoaded] = useState(false)
	const profileImg = listing.user.profileImg === "" ? "/profile.svg" : listing.user.profileImg

	return (
		<>
			<div className={ `${ styles.wrapper } ${ className } ${ imgLoaded ? styles.show : styles.hide }` }>
				<Link to={ `/details/${ listing._id }` } className={ styles.imageWrapper }>
					<img
						src={ listing.mainImg }
						alt="Service Main Image"
						className={ styles.serviceImg }
						onLoad={ () => setImgLoaded(true) }
						onError={ () => setImgLoaded(false) }
					/>
					<div className={ `${ styles.comfortaa } ${ styles.townDiv }` }>
						{ listing.town.name }
					</div>
				</Link>
				<Link to={ `/details/${ listing._id }` }
				      className={ `${ styles.listingHeading } ${ headingClassName }` }>{ listing.heading }</Link>
				<div className={ styles.profileInfoWrapper }>
					<Link to={ `/profile/${ listing.user._id }` } className={ styles.profileImageWrapper }>
						<img src={ profileImg } alt="" className={ `${ styles.profilePic } ${ profilePicClassName }` }/>
						<div
							className={ `${ styles.comfortaa } ${ styles.nameAndSurname }` }>{ listing.user.nameAndSurname }</div>
					</Link>
					<div
						className={ `${ styles.priceE } ${ priceClassName }` }>{ listing.price == 0 ? 'По договаряне' : `${ listing.price } лв.` }</div>
				</div>
			</div>
			<ImageLoadingPlaceholder
				outerClassName={ imgLoaded ? styles.hide : `${ styles.show } ${ styles.imgLoader } ${ styles.wrapper } ${ className }` }/>
		</>
	)
}

export default ListingCard