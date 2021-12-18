import styles from './HeadPageBanner.module.css'
import Carousel from "../BannerCarousel/Carousel/Carousel.jsx"
import SearchBar from "../../SearchBar/SearchBar.jsx"
import { useNavigate } from "react-router-dom"


const HeadPageBanner = (props) => {
	const navigate = useNavigate()

	const onSearchSubmit = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		if (formDataObj.search !== "") {
			navigate(`/search?search=${ formDataObj.search }`)
		}
	}

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
					<SearchBar placeholder="Опитай с Пешо или Сийка!" onSearchSubmit={ onSearchSubmit }/>
				</div>
			</section>
			<Carousel className={ `${ styles.mainBannerSection } ${ styles.mainBannerCarouselSection }` }/>
		</section>
	)
}

export default HeadPageBanner