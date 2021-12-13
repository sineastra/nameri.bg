import styles from './HeadPageBanner.module.css'
import Carousel from "../BannerCarousel/Carousel/Carousel.jsx"
import SearchBar from "../../SearchBar/SearchBar.jsx"


const HeadPageBanner = (props) => {

	return (
		<section className={ styles.mainBanner }>
			<section className={ `${ styles.mainBannerSection } ${ styles.mainBannerHeaderSection }` }>
				<div className={ styles.headingsSectionPart }>
					<h1 className={ styles.bigHeader }>НАПРАВИ ПРОЕКТА СИ РЕАЛНОСТ</h1>
				</div>
				<div className={ styles.headingsSectionPart }>
					<h2 className={ styles.smallHeader }>Намери подходящият човек за всяка една твоя идея</h2>
				</div>
				<div className={ `${ styles.headingsSectionPart } ${ styles.searchBarContainer }` }>
					<SearchBar placeholder="Опитай с Пешо или Сийка!"/>
				</div>
			</section>
			<Carousel className={ `${ styles.mainBannerSection } ${ styles.mainBannerCarouselSection }` }/>
		</section>
	)
}

export default HeadPageBanner