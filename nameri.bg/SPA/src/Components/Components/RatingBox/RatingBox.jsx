import styles from "./RatingBox.module.css"
import { FaStar } from "react-icons/fa"


const RatingBox = ({ user, showVotes, className = "" }) => {

	return (
		<div className={ `${ styles.headingInnerWrapper } ${ className }` }>
			<div className={ styles.iconWrapper }>
				<div>{ user.rating }</div>
				<FaStar/>
			</div>
			{ showVotes && <div>
				{ user.reviews.length } гласа
			</div> }
		</div>
	)
}

export default RatingBox