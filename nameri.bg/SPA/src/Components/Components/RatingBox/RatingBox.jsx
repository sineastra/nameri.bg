import styles from "./RatingBox.module.css"
import { FaStar } from "react-icons/fa"


const RatingBox = ({ user, showVotes }) => {

	return (
		<div className={ styles.headingInnerWrapper }>
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