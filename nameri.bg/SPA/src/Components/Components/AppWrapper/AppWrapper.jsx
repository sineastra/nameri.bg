import styles from "./AppWrapper.module.css"
import AppRouter from "../Router/AppRouter.jsx"
import { useContext, useEffect, useState } from "react"
import SoftErrorsContext from "../../Contexts/SoftErrorsContext.jsx"
import UserContext from "../../Contexts/UserContext.jsx"
import deserializeJWT from "../../../helpers/deserializeJWT.js"
import getToken from "../../../helpers/getToken.js"
import _processFetch from "../../../services/_processFetch.js"
import ErrorBoundaryContext from "../../Contexts/ErrorBoundaryContext.jsx"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


let timeout = 0

function AppWrapper (props) {
	const { setBoundaryError } = useContext(ErrorBoundaryContext)
	const [softErrors, setSoftErrors] = useState(null)
	const [userData, setUserData] = useState()
	const processRequest = (service) => _processFetch(service, setBoundaryError, setSoftErrors)

	// preserve user state on reloads.
	useEffect(() => {
		try {
			setUserData(deserializeJWT(getToken()))
		} catch (e) {
			setUserData(null)
		}
	}, [])

	// TODO: check if you can use useInterval custom hook here.
	useEffect(() => {
		if (softErrors !== '') {
			timeout = setTimeout(() => setSoftErrors(''), 5000)
		} else {
			clearTimeout(timeout)
		}
	}, [softErrors, userData])

	const closeNotif = () => {
		setSoftErrors('')
	}

	return (
		<UtilityContext.Provider value={ { processRequest } }>
			<UserContext.Provider value={ [userData, setUserData] }>
				<SoftErrorsContext.Provider value={ [softErrors, setSoftErrors] }>

					{ softErrors && softErrors.length > 0 &&
						<div className={ styles.errorNotif }>
							{ softErrors.map(x => (<div key={ x }>{ x }</div>)) }
							<span className={ styles.closeBtn } onClick={ closeNotif }>X</span>
						</div> }
					<AppRouter/>

				</SoftErrorsContext.Provider>
			</UserContext.Provider>
		</UtilityContext.Provider>
	)
}

// TODO: check how the user context is being set,as UseEffect gets started after the render and even worse,
// setState is dispatched to happen some time in the future. How do the components that rely on user context not throw.

export default AppWrapper
