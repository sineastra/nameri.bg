import { useEffect, useRef } from "react"


const useInterval = (callback, tickTime) => {
	const newCallback = useRef()

	useEffect(() => {
		newCallback.current = callback
	}, [callback])

	useEffect(() => {
		if (tickTime !== null) {
			const interval = setInterval(() => newCallback.current(), tickTime)

			return () => clearInterval(interval)
		}
	}, [tickTime])
}

export default useInterval