import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext.jsx"
import { Navigate, useParams } from "react-router-dom"
import Spinner from "../Components/Spinner/Spinner.jsx"
import useFetch from "../../hooks/useFetch.jsx"
import userServices from "../../services/userServices.js"


const OwnershipRoute = ({ children, type }) => {
	const params = useParams()
	const [user, _] = useContext(UserContext)
	const ownershipTypes = {
		'listing': async () => await userServices.checkListingOwnership(params.id),
	}
	const { isLoadingData, data } = useFetch(ownershipTypes[type], [user])

	console.log(data)

	return (
		isLoadingData ? null : data ? children : <Navigate to="/error"/>
	)
}

export default OwnershipRoute