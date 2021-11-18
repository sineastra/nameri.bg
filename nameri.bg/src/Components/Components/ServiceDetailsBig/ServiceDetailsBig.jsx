import styles from "./ServiceDetailsBig.module.css"
import Carousel from "../Carousel/Carousel.jsx"
import img1 from "../../../assets/images/service1.png"
import img2 from "../../../assets/images/auto-service-3073377-2553276.png"
import img3 from "../../../assets/images/construction.png"
import img4 from "../../../assets/images/digitalServices.jpg"
import img5 from "../../../assets/images/collage-work--desktop.webp"
import img6 from "../../../assets/images/popular-cat1.jpg"
import img7 from "../../../assets/images/hero-instance-2--desktop.webp"
import img8 from "../../../assets/images/hero-instance-4--desktop.webp"
import img9 from "../../../assets/images/service3.jpg"
import ServiceSideCard from "../ServiceSideCard/ServiceSideCard.jsx"
import profilePic1 from "../../../assets/images/profile-pic1.webp"
import serviceImg1 from "../../../assets/images/service1.png"
import profilePic2 from "../../../assets/images/profile-pic2.webp"
import serviceImg2 from "../../../assets/images/service2.jpg"
import profilePic3 from "../../../assets/images/profile-pic3.webp"
import serviceImg3 from "../../../assets/images/service3.jpg"
import CustomerServiceCard from "../CustomerServiceCard/CustomerServiceCard.jsx"


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
		id: 9,
		img: img7,
	},
	{
		id: 10,
		img: img8,
	},
	{
		id: 11,
		img: img9,
	},
]

const similarServicesFetch = [{
	user: { fullName: 'Потребителя Пенка', profilePic: profilePic1 },
	service: { town: 'Пешово', цена: 40, title: "Дръвчета за садене", mainImg: serviceImg1 },
},
	{
		user: { fullName: 'Потребителя Пешо', profilePic: profilePic2 },
		service: { town: 'Гошово', цена: 140, title: "Семки за льопане", mainImg: serviceImg2 },
	},
	{
		user: { fullName: 'Непотребния Йоцо', profilePic: profilePic3 },
		service: { town: 'Яифос', цена: 'По Договаряне', title: "Булки за женене", mainImg: serviceImg3 },
	},
]

const ServiceDetailsBig = ({ service }) => {

	return (
		<>
			<section className={ styles.mainSection }>
				<section className={ styles.carouselSection }>
					<Carousel data={ fakeData } imgsPerSlide={ 3 }/>
				</section>
				<section className={ styles.sideSection }>
					<ServiceSideCard/>
				</section>
			</section>

			<section className={ styles.serviceDetails }>
				<h1 className={ styles.detailsHeader }>Детайли за обявата</h1>
				<div className={ styles.innerDetails }>
					<p>
						{ service.details }
					</p>
				</div>
			</section>

			<section className={ styles.similarServices }>
				{ similarServicesFetch.map(x => (
					<CustomerServiceCard service={ x.service } user={ x.user } className={ styles.similarService }/>
				)) }
			</section>
		</>
	)
}

export default ServiceDetailsBig