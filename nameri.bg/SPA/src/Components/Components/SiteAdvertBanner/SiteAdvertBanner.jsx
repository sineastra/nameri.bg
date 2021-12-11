import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"
import styles from "./SiteAdvertBanner.module.css"
import bannerImg from "../../../assets/images/collage-work--desktop.webp"
import { Link } from "react-router-dom"


const SiteAdvertBanner = ({ className = "" }) => {
	return (
		<section className={ `${ styles.mainSection } ${ className }` }>
			<div className={ styles.innerSection }>
				<IconContext.Provider value={ { className: styles.iconClass } }>
					<div className={ styles.headingsOuterContainer }>
						<div className={ styles.headingsContainer }>
							<h2 className={ styles.mainHeading }>Осъществяването на твой проект професионално никога не
								е
								било толкова лесно!</h2>
							<div className={ styles.innerCheckMarkCont }>
								<div className={ styles.checkMarkDiv }>
									<FaCheck/>
									<div className={ styles.checkMarkText }>Свържи се с експерти в областа за минути
									</div>
								</div>
								<div className={ styles.checkMarkDiv }>
									<FaCheck/>
									<div className={ styles.checkMarkText }>24/7 поддръжка и съдействие</div>
								</div>
								<div className={ styles.checkMarkDiv }>
									<FaCheck/>
									<div className={ styles.checkMarkText }>Гаранция за качество и защита от измама.
									</div>
								</div>
							</div>
						</div>
						<button className={ styles.registerBtn }>
							<Link to="/sign-up" className={ styles.linkBtn }>START NOW FOR FREE</Link>
						</button>
					</div>
				</IconContext.Provider>
				<div className={ styles.bannerImgCont }>
					<img src={ bannerImg } alt="" className={ styles.bannerImg }/>
				</div>
			</div>
		</section>
	)
}

export default SiteAdvertBanner