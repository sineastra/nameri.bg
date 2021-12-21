import styles from "./CarouselSingleSlider.module.css"
import CarouselSingleImgSlider from "../CarouselSingleImgSlider/CarouselSingleImgSlider.jsx"


const CarouselSingleSlider = ({ slideData, changeActiveImg, className = "" }) => {

	return (
		<div className={ `${ styles.slidersInnerWrapper } ${ className }` }>
			{ slideData.map(img => (
				<CarouselSingleImgSlider key={ img.src } src={ img.src } onClick={ () => changeActiveImg(img.src) }/>)) }
		</div>
	)
}

export default CarouselSingleSlider