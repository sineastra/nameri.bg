import styles from "./AppWrapper.module.css"
import AppRouter from "../Router/AppRouter.jsx"
import { useEffect, useState } from "react"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import getToken from "../../../helpers/getToken.js"


let timeout = 0

function AppWrapper (props) {
	const [errors, setErrors] = useState(null)
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
		if (errors !== '') {
			timeout = setTimeout(() => setErrors(''), 5000)
		} else {
			clearTimeout(timeout)
		}
	}, [errors, userData])

	const closeNotif = () => {
		setErrors('')
	}

	return (

		<UserContext.Provider value={ [userData, setUserData] }>
			<ErrorContext.Provider value={ [errors, setErrors] }>

				{ errors && errors.length > 0 &&
					< div className={ styles.errorNotif }>
						{ errors.map(x => (<div>{ x }</div>)) }
						<span className={ styles.closeBtn } onClick={ closeNotif }>X</span>
					</div> }
				<AppRouter/>

			</ErrorContext.Provider>
		</UserContext.Provider>
	)
}

export default AppWrapper
