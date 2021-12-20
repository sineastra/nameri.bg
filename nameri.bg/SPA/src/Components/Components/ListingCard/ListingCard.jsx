import styles from "./ListingCard.module.css"
import { Link } from "react-router-dom"
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const ListingCard = ({ className, headingClassName, profilePicClassName, namesClassName, priceClassName, listing }) => {
	const [imgLoaded, setImgLoaded] = useState(false)
	const profileImg = listing.user.profileImg === "" ? "/profile.png" : listing.user.profileImg
	const mainImg = listing.mainImg === "" ? "/Default-cover.svg" : listing.mainImg

	return (
		<>
			<div className={ `${ styles.wrapper } ${ className }` }>
				<Link to={ `/details/${ listing._id }` } className={ styles.imageWrapper }>
					<img
						src={ mainImg }
						alt="Service Main Image"
						className={ `${ styles.serviceImg } ${ imgLoaded ? styles.show : styles.hide }` }
						onLoad={ () => setImgLoaded(true) }
						onError={ () => setImgLoaded(false) }
					/>
					<ImageLoadingPlaceholder
						outerClassName={ `${ styles.serviceImg } ${ imgLoaded ? styles.hide : styles.show }` }/>
					<div className={ `${ styles.comfortaa } ${ styles.townDiv }` }>
						{ listing.town.name }
					</div>
				</Link>
				<Link to={ ` / details /${ listing._id }` }
				      className={ `${ styles.listingHeading } ${ headingClassName }` }>{ listing.heading }</Link>
				<div className={ styles.profileInfoWrapper }>
					<Link to={ `/profile/${ listing.user._id }` } className={ styles.profileImageWrapper }>
						<div className={ profilePicClassName }>
							<img src={ profileImg } alt=""
							     className={ `${ styles.profilePic }` }/>
						</div>
						<div
							className={ `${ styles.comfortaa } ${ styles.nameAndSurname } ${ namesClassName }` }>{ listing.user.nameAndSurname }</div>
					</Link>
					<div
						className={ `${ styles.priceE } ${ priceClassName }` }>{ listing.price == 0 ? 'По договаряне' : `${ listing.price } лв.` }</div>
				</div>
			</div>
		</>
	)
}

export default ListingCard