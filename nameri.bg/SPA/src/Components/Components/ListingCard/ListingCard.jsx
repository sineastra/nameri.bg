import styles from "./ListingCard.module.css"
import { Link } from "react-router-dom"
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const ListingCard = ({ className, listing, user }) => {
	const [imgLoaded, setImgLoaded] = useState(false)
	const profileImg = user.profileImg === "" ? "/profile.svg" : user.profileImg

	return (
		<>
			<div className={ `${ styles.outerWrapper } ${ className } ${ imgLoaded ? styles.show : styles.hide }` }>
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
				<Link to={ `/details/${ listing._id }` } className={ styles.listingHeading }>{ listing.heading }</Link>
				<div className={ styles.profileInfoWrapper }>
					<Link to={ `/profile/${ user._id }` } className={ styles.profileImageWrapper }>
						<img src={ profileImg } alt="" className={ styles.profilePic }/>
						<div
							className={ `${ styles.comfortaa } ${ styles.nameAndSurname }` }>{ user.nameAndSurname }</div>
					</Link>
					<div className={ styles.priceE }>{ listing.prices[0] } лв.</div>
				</div>
			</div>
			<ImageLoadingPlaceholder
				outerClassName={ imgLoaded ? styles.hide : `${ styles.show } ${ styles.imgLoader } ${ styles.outerWrapper } ${ className }` }/>
		</>
	)
}

export default ListingCard