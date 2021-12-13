import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const useFetch = (fetchData) => {
	const navigate = useNavigate()
	const [isLoadingData, setIsLoadingData] = useState(true)

	useEffect(() => {
		try {
			fetchData().then(setIsLoadingData(false))
		} catch (e) {
			navigate("/error", {
				state: {
					statusCode: e.statusCode, status: e.status,
				},
			})
		}
	}, [])

	return { isLoadingData }
}

export default useFetch