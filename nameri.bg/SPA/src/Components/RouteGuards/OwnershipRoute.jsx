import { useContext } from "react"
import UserContext from "../Contexts/UserContext.jsx"
import { Navigate, useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch.jsx"
import userServices from "../../services/userServices.js"
import Spinner from "../Components/Spinner/Spinner.jsx"


const OwnershipRoute = ({ children, type }) => {
	const params = useParams()
	const [user] = useContext(UserContext)
	const ownershipTypes = {
		'listing': async () => await userServices.checkListingOwnership(params.id),
	}
	const { isLoadingData, data } = useFetch(ownershipTypes[type], [user])

	return (
		isLoadingData
			? <Spinner/>
			: data ? children : <Navigate to="/error"/>
	)
}

export default OwnershipRoute