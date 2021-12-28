import styles from "./Spinner.module.css"
import MainPageLayout from "../common/MainPageLayout/MainPageLayout.jsx"
import { useRef } from "react"


const Spinner = () => {

	// On every new spinner, we recalculate the time it is now, divided by the animation time the spinner uses.
	// This gives us the amount of time it has passed since the last tick (in my spinner a tick === 1.2seconds)
	// Lets say it is 0.5s elapsed since the last tick. We then now subtract that from our animation time (1.2s)
	// pass this as CSS variable to the spinner to delay the animation with so much seconds, so the animation aligns
	// with the previous spinner animation. Done, no waterfalls.
	const timeNowRef = useRef(Date.now())
	const animationDelay = -(1200 - timeNowRef.current % 1200)

	return (
		<MainPageLayout>
			<div className={ styles.wrapper }>
				<div className={ styles['lds-facebook'] } style={{'--spinner-delay': `${animationDelay}ms`}}>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</MainPageLayout>

	)
}

export default Spinner