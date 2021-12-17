import styles from "./Rating.module.css"
import RatingStar from "../RatingStar/RatingStar.jsx"


const Rating = ({ ratings = [1, 2, 3, 4, 5], onMouseLeave, pickRating, addRating, hoverRating }) => {

	return (
		<div className={ styles.wrapper } onMouseLeave={ onMouseLeave }>
			{ ratings.map(x => (
				<RatingStar
					key={ x }
					pickRating={ () => pickRating(x) }
					addRating={ () => addRating(x) }
					hoverRating={ hoverRating }
					starRating={ x }
				/>
			)) }
		</div>
	)
}

export default Rating