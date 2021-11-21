import styles from "./CarouselSingleSlider.module.css"


const CarouselSingleSlider = ({ slideData, setActiveImgIndx, className }) => {
	
	console.log(slideData)

	return (
		<div className={`${styles.slidersInnerWrapper} ${className}`}>
			{slideData.map(x => (
				<div id={x.id} key={x.id} onClick={() => setActiveImgIndx(x.id)}
				     className={styles.sliderSingleImgContainer}>
					<img src={x.img} alt="" className={styles.sliderSingleImg}/>
				</div>
			))}
		</div>
	)
}

export default CarouselSingleSlider