import styles from "./CarouselSingleImgSlider.module.css"
import ImageLoadingPlaceholder from "../../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"
import { useState } from "react"


const CarouselSingleImgSlider = ({ src, onClick }) => {
	const [imgLoaded, setImgLoaded] = useState(false)

	return (
		<>
			<div id={ src } onClick={ onClick }
			     className={ imgLoaded ? `${ styles.sliderSingleImgContainer } ${ styles.show }` : styles.hide }>
				<img
					src={ src }
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