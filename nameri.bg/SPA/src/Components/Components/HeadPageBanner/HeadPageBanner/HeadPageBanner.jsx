import styles from './HeadPageBanner.module.css'
import Carousel from "../BannerCarousel/Carousel/Carousel.jsx"
import SearchBar from "../../SearchBar/SearchBar.jsx"


const HeadPageBanner = () => {

	return (
		<section className={styles.mainBanner}>
			<section className={`${styles.mainBannerSection} ${styles.mainBannerHeaderSection}`}>
				<div className={styles.fullWidth}>
					<h1 className={styles.bigHeader}>НАПРАВИ ПРОЕКТА СИ РЕАЛНОСТ.</h1>
				</div>
				<div className={styles.fullWidth}>
					<h2 className={styles.smallHeader}>Намери подходящият човек за всяка една твоя идея.</h2>
				</div>
				<div className={styles.fullWidth}>
					<SearchBar placeholder="Опитай с Пешо или Сийка!"/>
				</div>
			</section>
			<Carousel className={styles.mainBannerSection}/>
		</section>
	)
}

export default HeadPageBanner