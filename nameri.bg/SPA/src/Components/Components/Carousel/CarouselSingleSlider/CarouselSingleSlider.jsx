import styles from "./CarouselSingleSlider.module.css"
import CarouselSingleImgSlider from "../CarouselSingleImgSlider/CarouselSingleImgSlider.jsx"


const CarouselSingleSlider = ({ slideData, setActiveImgIndx, className = "" }) => {

	return (
		<div className={ `${ styles.slidersInnerWrapper } ${ className }` }>
			{ slideData.map((x, i) => (
				<CarouselSingleImgSlider key={ x } id={ x } onClick={ () => setActiveImgIndx(i) }/>)) }
		</div>
	)
}

export default CarouselSingleSlider