import styles from "./UsersList.module.css"
import UserList from "../UserList/UserList.jsx"


const UsersList = ({ users, className = "" }) => {

	return (
		<div className={ `${ className } ${ styles.wrapper }` }>
			{ users.map(x => <UserList key={ x._id } user={ x }/>) }
		</div>
	)
}

export default UsersList