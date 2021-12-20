import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { useState } from "react"
import styles from "./Slide.module.css"
import ImageLoadingPlaceholder from "../../../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"


const Slide = ({ listing, activeId, isFirstSlide, index }) => {
	const [slideImgLoaded, setSlideImgLoaded] = useState(false)
	const [profileImgLoaded, setProfileImgLoaded] = useState(false)
	let profileImg = listing.user.profileImg === "" ? "/profile.png" : listing.user.profileImg
	const mainImg = listing.mainImg === "" ? "Default-cover.svg" : listing.mainImg
	let className = ''

	const isActive = activeId === listing._id

	if (isFirstSlide.current) {
		className = index === 0 ? styles.firstSlide : ''
	} else {
		className = isActive
			? styles.activeSlide
			: styles.inactiveSlide
	}

	return (
		<section className={ `${ styles.slideWrapper } ${ className }` }>
			<section className={ styles.slideImageSection }>
				<Link to={ `/details/${ listing._id }` }>
					<img
						src={ mainImg }
						alt=""
						onLoad={ () => setSlideImgLoaded(true) }
						onError={ () => setSlideImgLoaded(false) }
						className={ `${ styles.slideImg } ${ slideImgLoaded ? styles.show : styles.hide }` }
					/>
				</Link>
				<ImageLoadingPlaceholder
					outerClassName={ `${ styles.slideImg } ${ slideImgLoaded ? styles.hide : styles.show }` }/>
			</section>
			<section className={ styles.userProfileSection }>
				<Link className={ styles.userLink } to={ `/profile/${ listing.user._id }` }>
					<div className={ styles.profileImgWrapper }>
						<img
							src={ profileImg }
							alt=""
							onError={ () => profileImg = "/profile.png" }
							onLoad={ () => setProfileImgLoaded(true) }
							className={ `${ styles.profileImg } ${ slideImgLoaded ? styles.show : styles.hide }` }
						/>
						<ImageLoadingPlaceholder
							outerClassName={ `${ styles.profileImg } ${ profileImgLoaded ? styles.hide : styles.show }` }/>
					</div>
					<div className={ `${ styles.styledUserSection } ${ styles.listingsCountWrapper }` }>
						<h5 className={ styles.listingNumberHead }>{ listing.user.listings.length } обяви</h5>
					</div>
					<div className={ `${ styles.styledUserSection } ${ styles.userNamesWrapper }` }>
						<span className={ styles.userNames }
						      title={ styles.userNames }>{ listing.user.nameAndSurname }</span>
					</div>
					<div className={ `${ styles.styledUserSection } ${ styles.votesWrapper }` }>
						<IconContext.Provider value={ { className: styles.faStar } }>
							<FaStar/>
						</IconContext.Provider>
						<span className={ styles.styledSpanVotes }>{ listing.user.rating }</span>
						<span className={ styles.styledSpanVotes }> ({ listing.user.reviews.length } votes)</span>
					</div>
				</Link>
			</section>
		</section>
	)
}

export default Slide