import styles from "./UserRatingHeading.module.css"
import RatingBox from "../RatingBox/RatingBox.jsx"


const UserRatingHeading = ({
	                           user,
	                           showVotes,
	                           rating,
	                           wrapperClassName = "",
	                           profileImgClassName = "",
	                           headingClassName = "",
	                           ratingBoxClassName = "",
	                           ratingBoxWrapperClassName = "",
                           }) => {

	return (
		<div className={ `${ styles.userInfoHeadings } ${ wrapperClassName }` }>
			<div className={ styles.imageWrapper }>
				<img src={ user.profileImg || "/profile.svg" }
				     alt="Profile"
				     className={ `${ styles.profileImg } ${ profileImgClassName }` }
				/>
			</div>
			<div className={ `${ styles.userFullName } ${ headingClassName }` }>
				{ user.nameAndSurname }
			</div>
			<div className={ ratingBoxWrapperClassName }>
				<RatingBox user={ user } rating={ rating } showVotes={ showVotes } className={ ratingBoxClassName }/>
			</div>
		</div>
	)
}

export default UserRatingHeading