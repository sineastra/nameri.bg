import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext.jsx"
import { Navigate } from "react-router-dom"
import Spinner from "../Components/Spinner/Spinner.jsx"


const ProtectedRoute = ({ children, type }) => {
	const [user] = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(true)
	const typesConditions = {
		'private': () => user ? children : <Navigate to="/sign-in"/>,
		'public': () => !user ? children : <Navigate to="/"/>,
	}

	useEffect(() => setIsLoading(false), [user])

	return (
		isLoading ? <Spinner/> : typesConditions[type]()
	)
}

export default ProtectedRoute