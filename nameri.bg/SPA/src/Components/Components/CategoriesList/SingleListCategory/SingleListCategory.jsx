import styles from "./SingleListCategory.module.css"
import { Link } from "react-router-dom"


const SingleListCategory = ({ _id, name, listings, className = '' }) => {

	return (
		<Link className={ `${ styles.singleCatCont } ${ className }` } to={ `/subcategories/${ _id }` } title={ name }>
			<div className={ styles.name }>{ name }</div>
			<div className={ styles.listings }>{ listings.length }</div>
		</Link>
	)
}

export default SingleListCategory