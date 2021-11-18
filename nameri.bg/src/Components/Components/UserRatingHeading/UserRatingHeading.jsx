import styles from "./UserRatingHeading.module.css"
import RatingBox from "../RatingBox/RatingBox.jsx"


const UserRatingHeading = ({
	                           user,
	                           showVotes,
	                           wrapperClassName = "",
	                           profileImgClassName = "",
	                           headingClassName = "",
                           }) => {

	return (
		<div className={ `${ styles.userInfoHeadings } ${ wrapperClassName }` }>
			<div className={styles.imageWrapper}>
				<img src={ user.profileImg } alt="Profile"
				     className={ `${ styles.profileImg } ${ profileImgClassName }` }/>
			</div>
			<div className={ `${ styles.userFullName } ${ headingClassName }` }>
				{ user.fullName }
			</div>
			<div>
				<RatingBox { ...{ user, showVotes } }/>
			</div>
		</div>
	)
}

export default UserRatingHeading