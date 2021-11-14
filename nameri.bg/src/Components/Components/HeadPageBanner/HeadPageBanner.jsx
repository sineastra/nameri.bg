import styles from './HeadPageBanner.module.css'
import { FaSearch } from "react-icons/fa"
import Carousel from "./BannerCarousel/Carousel/Carousel.jsx"


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
					<div className={styles.searchContainer}>
						<input type="search" placeholder='Опитай с "Пешо" или "Сийка"' className={styles.searchInput}/>
						<button className={`${styles.searchBtn}`}>
							<FaSearch/>
						</button>
					</div>
				</div>
			</section>
			<Carousel className={styles.mainBannerSection}/>
		</section>
	)
}

export default HeadPageBanner