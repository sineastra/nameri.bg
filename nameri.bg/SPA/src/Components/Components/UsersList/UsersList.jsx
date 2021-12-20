import styles from "./UsersList.module.css"
import UserList from "../UserList/UserList.jsx"


const UsersList = ({ users, heading, className = "" }) => {

	return (
		<section className={ `${ className } ${ styles.usersSection }` }>
			<h1 className={ styles.header }>{ heading }</h1>
			{ users.map(x => <UserList user={ x }/>) }
		</section>
	)
}

export default UsersList