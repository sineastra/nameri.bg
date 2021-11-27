import styles from "./CarouselSingleSlider.module.css"


const CarouselSingleSlider = ({ slideData, setActiveImgIndx, className }) => {
	return (
		<div className={ `${ styles.slidersInnerWrapper } ${ className }` }>
			{ slideData.map((x, i) => (
				<div id={ i } key={ i } onClick={ () => setActiveImgIndx(i) }
				     className={ styles.sliderSingleImgContainer }>
					<img src={ x.img } alt="" className={ styles.sliderSingleImg }/>
				</div>
			)) }
		</div>
	)
}

export default CarouselSingleSlider