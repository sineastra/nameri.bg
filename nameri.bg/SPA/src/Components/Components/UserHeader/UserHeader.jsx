import styles from "./UserHeader.module.css"
import { Link } from "react-router-dom"


const UserHeader = ({ user, className }) => {
	return (
		<div className={ `${ styles.wrapper } ${ className }` }>
			{ user === null
				? <Link to={ '/sign-in' }
				        className={ `${ styles.mainNavLink } ${ styles.authLink }` }>Влез</Link>
				: <div></div>
			}
		</div>
	)
}

export default UserHeader