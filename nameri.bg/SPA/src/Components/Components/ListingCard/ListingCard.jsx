import styles from "./ListingCard.module.css"
import { useEffect, useState } from "react"
import listingsServices from "../../../services/listingsServices.js"
import { useNavigate, useParams } from "react-router-dom"


const ListingCard = ({ className, listing, user }) => {
	return (

		<div className={ `${ styles.outerWrapper } ${ className }` }>
			<div className={ styles.imageWrapper }>
				<img src={ listing.mainImg } alt="Service Main Image" className={ styles.serviceImg }/>
				<div className={ `${ styles.comfortaa } ${ styles.townDiv }` }>
					{ listing.town }
				</div>
			</div>
			<h2 className={ styles.serviceHeading }>{ listing.title }</h2>
			<div className={ styles.profileInfoWrapper }>
				<div className={ styles.profileImageWrapper }>
					<img src={ user.profilePic } alt="User ProfilePage Image" className={ styles.profilePic }/>
					<div className={ styles.comfortaa }>{ user.fullName }</div>
				</div>
				<div className={ styles.priceE }>{ listing.prices[0] }</div>
			</div>
		</div>
	)
}

export default ListingCard