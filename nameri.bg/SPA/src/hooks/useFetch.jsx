import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const useFetch = (fetchData, deps = []) => {
	const navigate = useNavigate()
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [data, setData] = useState({})

	useEffect(() => {
		setIsLoadingData(true)

		fetchData()
			.then(fetchedData => {
				setData(fetchedData)
				setIsLoadingData(false)
			})
			.catch(e => {
				navigate("/error", {
					state: {
						statusCode: e.statusCode, status: e.status, msg: e,
					},
				})

			})

	}, deps)

	return {
		isLoadingData,
		setIsLoadingData,
		data,
		setData,
	}
}

export default useFetch