import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext.jsx"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({ children, type }) => {
	const [user, _] = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(true)
	const typesConditions = {
		'private': () => user ? children : <Navigate to="/sign-in"/>,
		'public': () => !user ? children : <Navigate to="/"/>,
	}

	useEffect(() => setIsLoading(false), [user])

	return (
		isLoading ? null : typesConditions[type]()
	)
}

export default ProtectedRoute