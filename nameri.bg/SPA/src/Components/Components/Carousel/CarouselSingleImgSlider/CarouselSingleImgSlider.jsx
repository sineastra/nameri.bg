import styles from "./CarouselSingleImgSlider.module.css"
import ImageLoadingPlaceholder from "../../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const CarouselSingleImgSlider = ({ id, onClick }) => {
	const [imgLoaded, setImgLoaded] = useState(false)

	return (
		<>
			<div id={ id } onClick={ onClick }
			     className={ imgLoaded ? `${ styles.sliderSingleImgContainer } ${ styles.show }` : styles.hide }>
				<img
					src={ id }
					alt=""
					className={ styles.sliderSingleImg }
					onLoad={ () => setImgLoaded(true) }
					onError={ () => setImgLoaded(false) }
				/>
			</div>
			<ImageLoadingPlaceholder
				outerClassName={ imgLoaded ? styles.hide : `${ styles.show } ${ styles.sliderSingleImgContainer }` }/>
		</>
	)
}

export default CarouselSingleImgSlider