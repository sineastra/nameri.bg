import styles from "./SingleCategory.module.css"
import { Link } from "react-router-dom"


const SingleCategory = ({ _id, img, name }) => {

	return (
		<Link className={ styles.categContainer } to={ `/details/${ _id }` }>
			<img className={ styles.image } src={ img } alt="Popular Category Image"/>
			<h3 className={ styles.categHeading }>{ name }</h3>
		</Link>
	)
}

export default SingleCategory