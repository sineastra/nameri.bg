import styles from "./SingleListCategory.module.css"
import { Link } from "react-router-dom"


const SingleListCategory = ({ _id, name, listings, className = '' }) => {

	return (
		<Link className={ `${ styles.singleCatCont } ${ className }` } to={ `/subcategories/${ _id }` }>
			<div>{ name }</div>
			<div>{ listings.length }</div>
		</Link>
	)
}

export default SingleListCategory