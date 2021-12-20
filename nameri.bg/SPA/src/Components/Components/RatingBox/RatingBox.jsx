import styles from "./RatingBox.module.css"
import { FaStar } from "react-icons/fa"
import { IconContext } from "react-icons"


const RatingBox = ({ user, rating, showVotes, className = "" }) => {
	
	console.log(user, rating, showVotes)

	return (
		<div className={ `${ styles.headingInnerWrapper } ${ className }` }>
			<div className={ styles.iconWrapper }>
				<div className={ styles.rating }>{ rating }/5</div>
				<IconContext.Provider value={ { className: styles.starIcon } }>
					<FaStar/>
				</IconContext.Provider>
			</div>
			{ showVotes && <div>
				{ user.reviews.length } глас(а)
			</div> }
		</div>
	)
}

export default RatingBox