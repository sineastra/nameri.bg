import styles from "./CarouselSingleSlider.module.css"


const CarouselSingleSlider = ({ slideData, setActiveImgIndx, className }) => {

	console.log(slideData)
	return (
		<div className={ `${ styles.slidersInnerWrapper } ${ className }` }>
			{ slideData.map((x, i) => (
				<div id={ x } key={ x } onClick={ () => setActiveImgIndx(i) }
				     className={ styles.sliderSingleImgContainer }>
					<img src={ x } alt="" className={ styles.sliderSingleImg }/>
				</div>
			)) }
		</div>
	)
}

export default CarouselSingleSlider