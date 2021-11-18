import styles from "./ProfileSection.module.css"
import ProfileSideCard from "../ProfileSideCard/ProfileSideCard.jsx"
import profilePic1 from "../../../assets/images/profile-pic1.webp"
import serviceImg1 from "../../../assets/images/service1.png"
import profilePic2 from "../../../assets/images/profile-pic2.webp"
import serviceImg2 from "../../../assets/images/service2.jpg"
import profilePic3 from "../../../assets/images/profile-pic3.webp"
import serviceImg3 from "../../../assets/images/service3.jpg"
import CustomerServiceCard from "../CustomerServiceCard/CustomerServiceCard.jsx"


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
	{
		user: { fullName: 'Потребителя Пешо', profilePic: profilePic2 },
		service: { town: 'Гошово', цена: 140, title: "Семки за льопане", mainImg: serviceImg2 },
	},
	{
		user: { fullName: 'Непотребния Йоцо', profilePic: profilePic3 },
		service: { town: 'Яифос', цена: 'По Договаряне', title: "Булки за женене", mainImg: serviceImg3 },
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

const ProfileSection = () => {

	return (
		<div className={ styles.mainWrapper }>
			<div className={ styles.innerWrapper }>
				<section className={ styles.servicesSection }>
					{ similarServicesFetch.map(x => (
						<CustomerServiceCard service={ x.service } user={ x.user } className={ styles.serviceCard }/>
					)) }
				</section>
				<div className={styles.profileSideCardWrapper}>
					<ProfileSideCard className={ styles.className }/>
				</div>
			</div>
		</div>
	)
}

export default ProfileSection