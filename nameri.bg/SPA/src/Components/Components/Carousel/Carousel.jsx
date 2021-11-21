import styles from "./Carousel.module.css"
import { useRef, useState } from "react"
import CarouselSingleSlider from "./CarouselSingleSlider/CarouselSingleSlider.jsx"


const createSlidesArr = (data, imgsPerSlide) => {
	const slides = Math.ceil(data.length / imgsPerSlide)
	const slideArr = [[]]
	let slideArrIndex = 0

	// Dividing the length of all images passed by props to the desired images per slide and creating
	// an array of arrays (a matrix). Each inner array will be THE-DESIRED-IMAGES-COUNT,
	// except for the last which can be any count below or equal to the desired images count.

	for (let i = 0; i < slides; i += 1) {
		slideArr[slideArrIndex] = []
		for (let j = 0; j < imgsPerSlide; j += 1) {
			const currentIndex = i * imgsPerSlide + j

			if (data[currentIndex] === undefined) {
				return slideArr
			}

			slideArr[slideArrIndex].push(data[currentIndex])
		}
		slideArrIndex += 1
	}

	return slideArr
}

const Carousel = ({ data, imgsPerSlide = 3 }) => {
	const [activeImgIndx, setActiveImgIndx] = useState(0)
	const slideArray = createSlidesArr(data, imgsPerSlide)
	const sliderRef = useRef(null)

	const goNextSlide = () => {
		sliderRef.current.scrollBy(sliderRef.current.clientWidth, 0)
		console.dir(sliderRef.current)

		console.log(sliderRef.current.scrollLeft, sliderRef.current.clientWidth, sliderRef.current.scrollWidth)

		if (Math.abs(sliderRef.current.scrollWidth - (sliderRef.current.scrollLeft + sliderRef.current.clientWidth)) < 10) {
			sliderRef.current.scrollLeft = 0
		}
	}

	const goPrevSlide = () => {
		sliderRef.current.scrollBy(-sliderRef.current.clientWidth, 0)

		if (sliderRef.current.scrollLeft - sliderRef.current.scrollWidth === 0 || sliderRef.current.scrollLeft === 0) {
			sliderRef.current.scrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
		}
	}

	return (
		<div className={ styles.mainWrapper }>

			<div className={ styles.mainImgWrapper }>
				<img src={ data[activeImgIndx].img } alt="Main Service" className={ styles.mainImg }/>
			</div>

			<section className={ styles.slidersOuterWrapper }>
				<span className={ `${ styles.navArrow } ${ styles.leftArrow }` } onClick={ goPrevSlide }>&lt;</span>

				{/*SINGLE SLIDE WITH 3 OR MORE OR LESS IMAGES*/ }
				<div className={ styles.carouselWrapper } ref={ sliderRef }>
					{ slideArray.map(slideData => (
						<CarouselSingleSlider { ...{ slideData, setActiveImgIndx, key: slideData[0].id } }/>
					)) }
				</div>

				<span className={ `${ styles.navArrow } ${ styles.rightArrow }` } onClick={ goNextSlide }>&gt;</span>
			</section>

		</div>
	)
}

export default Carousel