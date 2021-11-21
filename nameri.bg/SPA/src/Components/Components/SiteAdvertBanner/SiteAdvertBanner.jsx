import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"
import styles from "./SiteAdvertBanner.module.css"
import bannerImg from "../../../assets/images/collage-work--desktop.webp"


const SiteAdvertBanner = ({ className = "" }) => {
	return (
		<section className={`${styles.mainSection} ${className}`}>
			<div className={styles.innerSection}>
				<IconContext.Provider value={{ color: 'green' }}>
					<div className={styles.headingsContainer}>
						<h2 className={styles.mainHeading}>Осъществяването на твой проект професионално никога не е било толкова лесно!</h2>
						<div className={styles.innerCheckMarkCont}>
							<div className={styles.checkMarkDiv}>
								<FaCheck/>
								<div className={styles.checkMarkText}>Свържи се с експерти в областа за минути</div>
							</div>
							<div className={styles.checkMarkDiv}>
								<FaCheck/>
								<div className={styles.checkMarkText}>24/7 поддръжка и съдействие</div>
							</div>
							<div className={styles.checkMarkDiv}>
								<FaCheck/>
								<div className={styles.checkMarkText}>Гаранция за качество и защита от измама.</div>
							</div>
						</div>
					</div>
				</IconContext.Provider>
				<div>
					<img src={bannerImg} alt=""/>
				</div>
			</div>
			<div>
				<button className={styles.registerBtn}>START NOW FOR FREE</button>
			</div>
		</section>
	)
}

export default SiteAdvertBanner