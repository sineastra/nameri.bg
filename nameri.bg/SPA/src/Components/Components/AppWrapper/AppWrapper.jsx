import styles from "./AppWrapper.module.css"
import AppRouter from "../Router/AppRouter.jsx"
import { useEffect, useState } from "react"
import ErrorContext from "../../../Contexts/ErrorContext.jsx"
import UserContext from "../../../Contexts/UserContext.jsx"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import getToken from "../../../helpers/getToken.js"


let timeout = 0

function AppWrapper (props) {
	const [error, setError] = useState('')
	const [userData, setUserData] = useState()

	// preserve user state on reloads.
	useEffect(() => {
		try {
			setUserData(deserializeJWT(getToken()))
		} catch (e) {
			setUserData(null)
		}
	}, [])

	useEffect(() => {
		if (error !== '') {
			timeout = setTimeout(() => setError(''), 5000)
		} else {
			clearTimeout(timeout)
		}
	}, [error, userData])

	const closeNotif = () => {
		setError('')
	}

	return (
		<UserContext.Provider value={ [userData, setUserData] }>
			<ErrorContext.Provider value={ [error, setError] }>

				{ error &&
					<div className={ styles.errorNotif }>
						{ error }
						<span className={ styles.closeBtn } onClick={ closeNotif }>X</span>
					</div> }
				<AppRouter/>

			</ErrorContext.Provider>
		</UserContext.Provider>
	)
}

export default AppWrapper