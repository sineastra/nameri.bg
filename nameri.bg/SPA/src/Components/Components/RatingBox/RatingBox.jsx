import styles from "./RatingBox.module.css"
import { FaStar } from "react-icons/fa"
import { IconContext } from "react-icons"


const RatingBox = ({ user, rating, showVotes, className = "" }) => {

	return (
		<div className={ `${ styles.headingInnerWrapper } ${ className }` }>
			<div className={ styles.iconWrapper }>
				<div className={ styles.rating }>{ rating }</div>
				<IconContext.Provider value={ { className: styles.starIcon } }>
					<FaStar/>
				</IconContext.Provider>
			</div>
			{ showVotes && <div>
				{ user.reviews.length } гласа
			</div> }
		</div>
	)
}

export default RatingBox