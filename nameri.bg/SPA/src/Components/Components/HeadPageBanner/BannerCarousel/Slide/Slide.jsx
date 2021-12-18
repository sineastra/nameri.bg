import styled from 'styled-components'
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { useState } from "react"
import styles from "./Slide.module.css"
import ImageLoadingPlaceholder from "../../../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"


const ContainerSection = styled.section`
  position: relative;
  transition: opacity 1s ease-in-out;
  width: 100%;
  opacity: ${ props => props.active ? 1 : 0 };
  height: ${ props => props.active ? '100%' : 0 };
  overflow: hidden;
`

const Slide = ({ listing, activeId }) => {
	const [slideImgLoaded, setSlideImgLoaded] = useState(false)
	const [profileImgLoaded, setProfileImgLoaded] = useState(false)
	let profileImg = listing.user.profileImg === "" ? "/profile.svg" : listing.user.profileImg

	return (
		<ContainerSection active={ activeId === listing._id }>
			<section className={ styles.slideImageSection }>
				<Link to={ `/details/${ listing._id }` }>
					<img
						src={ listing.mainImg }
						alt=""
						onLoad={ () => setSlideImgLoaded(true) }
						onError={ () => setSlideImgLoaded(false) }
						className={ `${ styles.slideImg } ${ slideImgLoaded ? styles.show : styles.hide }` }
					/>
				</Link>
				<ImageLoadingPlaceholder
					outerClassName={ slideImgLoaded ? styles.hide : `${ styles.show } ${ styles.slideLoader }` }/>
			</section>
			<section className={ styles.userProfileSection }>
				<Link className={ styles.userLink } to={ `/profile/${ listing.user._id }` }>
					<img
						src={ profileImg }
						alt=""
						onError={ () => profileImg = "/profile.svg" }
						onLoad={ () => setProfileImgLoaded(true) }
						className={ styles.profileImg }
					/>
					<ImageLoadingPlaceholder
						outerClassName={ profileImgLoaded ? styles.hide : `${ styles.show } ${ styles.profileLoader }` }/>
					<div className={ `${ styles.styledUserSection } ${ styles.listingsCountWrapper }` }>
						<h5 className={ styles.listingNumberHead }>{ listing.user.listings.length } обяви</h5>
					</div>
					<div className={ `${ styles.styledUserSection } ${ styles.userNamesWrapper }` }>
						<span className={ styles.userNames }>{ listing.user.nameAndSurname }</span>
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
		</ContainerSection>
	)
}

export default Slide