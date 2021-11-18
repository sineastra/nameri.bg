import Carousel from "../../Components/Carousel/Carousel.jsx"
import img1 from "../../../assets/images/service1.png"
import img2 from "../../../assets/images/auto-service-3073377-2553276.png"
import img3 from "../../../assets/images/construction.png"
import img4 from "../../../assets/images/digitalServices.jpg"
import img5 from "../../../assets/images/collage-work--desktop.webp"
import img6 from "../../../assets/images/popular-cat1.jpg"
import img7 from "../../../assets/images/hero-instance-2--desktop.webp"
import img8 from "../../../assets/images/hero-instance-4--desktop.webp"
import img9 from "../../../assets/images/service3.jpg"


const fakeData = [
	{
		id: 0,
		img: img1,
	},
	{
		id: 1,
		img: img2,
	},
	{
		id: 2,
		img: img3,
	},
	{
		id: 3,
		img: img4,
	},
	{
		id: 4,
		img: img5,
	},
	{
		id: 5,
		img: img6,
	},
	{
		id: 6,
		img: img7,
	},
	{
		id: 7,
		img: img8,
	},
	{
		id: 8,
		img: img9,
	},
	{
		id: 6,
		img: img7,
	},
	{
		id: 7,
		img: img8,
	},
	{
		id: 8,
		img: img9,
	},
]

const ServiceDetails = () => {

	return (
		<Carousel data={fakeData} imgsPerSlide={3}/>
	)
}

export default ServiceDetails