import styles from "./CustomerServiceCard.module.css"


const CustomerServiceCard = ({ user, service, className }) => {
	const priceString = service.price ? `Цена от ${service.price} лв.` : "По Договаряне"

	return (
		<div className={`${styles.outerWrapper} ${className}`}>
			<div className={styles.imageWrapper}>
				<img src={service.mainImg} alt="Service Main Image" className={styles.serviceImg}/>
				<div className={`${styles.comfortaa} ${styles.townDiv}`}>
					{service.town}
				</div>
			</div>
			<h2 className={styles.serviceHeading}>{service.title}</h2>
			<div className={styles.profileInfoWrapper}>
				<div className={styles.profileImageWrapper}>
					<img src={user.profilePic} alt="User Profile Image" className={styles.profilePic}/>
					<div className={styles.comfortaa}>{user.fullName}</div>
				</div>
				<div className={styles.priceE}>{priceString}</div>
			</div>
		</div>
	)
}

export default CustomerServiceCard