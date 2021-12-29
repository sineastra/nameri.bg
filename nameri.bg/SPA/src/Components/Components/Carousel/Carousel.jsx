import styles from "./Carousel.module.css"
import { useEffect, useRef, useState } from "react"
import CarouselSingleSlider from "./CarouselSingleSlider/CarouselSingleSlider.jsx"
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"


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

const Carousel = ({ imgData, imgsPerSlide = 3 }) => {
	const [imgLoaded, setImgLoaded] = useState(false)
	const [activeImg, setActiveImg] = useState('')
	const slidesArr = createSlidesArr(imgData, imgsPerSlide)
	const sliderRef = useRef(null)

	const goNextSlide = () => {
		sliderRef.current.scrollBy(sliderRef.current.clientWidth, 0)

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

	const changeActiveImg = (imgSrc) => {
		const newImg = imgData.find(x => x.src === imgSrc)

		setActiveImg(newImg)
	}

	useEffect(() => {
		if (imgData) {
			setActiveImg(imgData[0])
		}
	}, [imgData])

	return (
		<div className={ styles.mainWrapper }>

			<div className={ imgLoaded ? `${ styles.mainImgWrapper } ${ styles.show }` : styles.hide }>
				<img
					src={ activeImg.src }
					alt="Main Service"
					className={ styles.mainImg }
					onLoad={ () => setImgLoaded(true) }
					onError={ () => setImgLoaded(false) }
				/>
			</div>
			<ImageLoadingPlaceholder
				outerClassName={ imgLoaded ? styles.hide : `${ styles.show } ${ styles.mainImgWrapper } ${ styles.mainImgLoader }` }/>

			<section className={ styles.slidersOuterWrapper }>
				<span className={ `${ styles.navArrow } ${ styles.leftArrow }` } onClick={ goPrevSlide }>&lt;</span>

				<div className={ styles.carouselWrapper } ref={ sliderRef }>
					{/*SINGLE SLIDE WITH 3 OR MORE OR LESS IMAGES*/ }
					{ slidesArr.map(slideData => (
						<CarouselSingleSlider
							slideData={ slideData }
							changeActiveImg={ changeActiveImg }
							key={ slideData[0].src }
							className={ slideData.length < 3 ? styles.nonFullSlide : '' }
						/>))
					}
				</div>

				<span className={ `${ styles.navArrow } ${ styles.rightArrow }` } onClick={ goNextSlide }>&gt;</span>
			</section>

		</div>
	)
}

export default Carousel