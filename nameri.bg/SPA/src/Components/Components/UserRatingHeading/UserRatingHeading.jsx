import styles from "./UserRatingHeading.module.css"
import RatingBox from "../RatingBox/RatingBox.jsx"


const UserRatingHeading = ({
	                           user,
	                           showVotes,
	                           wrapperClassName = "",
	                           profileImgClassName = "",
	                           headingClassName = "",
	                           ratingBox = "",
	                           ratingBoxWrapper = "",
                           }) => {

	return (
		<div className={ `${ styles.userInfoHeadings } ${ wrapperClassName }` }>
			<div className={ styles.imageWrapper }>
				<img src={ user.profileImg || "/profile.svg" } alt="ProfilePage"
				     className={ `${ styles.profileImg } ${ profileImgClassName }` }/>
			</div>
			<div className={ `${ styles.userFullName } ${ headingClassName }` }>
				{ user.nameAndSurname }
			</div>
			<div className={ ratingBoxWrapper }>
				<RatingBox user={ user } showVotes={ showVotes } className={ ratingBox }/>
			</div>
		</div>
	)
}

export default UserRatingHeading