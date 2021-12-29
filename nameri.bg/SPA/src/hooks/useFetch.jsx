import { useContext, useEffect, useState } from "react"
import UtilityContext from "../Components/Contexts/UtilityContext.jsx"


const useFetch = (fetchData, deps = [], partialLoading = false, setPartialLoading = null) => {
	const { processRequest } = useContext(UtilityContext)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [data, setData] = useState({})

	useEffect(() => {
		partialLoading ? setPartialLoading(true) : setIsLoadingData(true)

		processRequest(fetchData)
			.then(fetchedData => {
				setData(fetchedData)

				if (fetchedData) {
					partialLoading ? setPartialLoading(false) : setIsLoadingData(false)
				}
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	return {
		isLoadingData,
		setIsLoadingData,
		data,
		setData,
	}
}

export default useFetch