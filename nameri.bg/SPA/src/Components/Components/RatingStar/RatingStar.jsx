import { FaRegStar, FaStar } from "react-icons/fa"
import { IconContext } from "react-icons"
import styles from "./RatingStar.module.css"


const RatingStar = ({ pickRating, addRating, hoverRating, starRating }) => {
	const filled = hoverRating >= starRating

	return (
		<div onClick={ pickRating }
		     onMouseEnter={ addRating }>
			<IconContext.Provider value={ { className: filled ? styles.filledIcon : styles.emptyIcon } }>
				{ filled
					? <FaStar/>
					: <FaRegStar/> }
			</IconContext.Provider>
		</div>
	)
}

export default RatingStar