import { Link, useSearchParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.jsx"
import userServices from "../../../services/userServices.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import styles from "./Search.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import ListingCard from "../../Components/ListingCard/ListingCard.jsx"


const fetchData = async (params) => {
	const search = params.get('search')

	const [users, listings] = await Promise.all([
		userServices.search(search),
		listingsServices.search(search),
	])

	return { users, listings }
}

const Search = () => {
	const [params, setParams] = useSearchParams()
	const { isLoadingData, data } = useFetch(() => fetchData(params), [params])

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<section className={ styles.wrapper }>
					<section className={ `${ styles.contentSection } ${ styles.usersSection }` }>
						<h1 className={ styles.header }>Потребители</h1>
						{ data.users.map(x => (
							<Link className={ styles.userLink } to={ `/profile/${ x._id }` }>
								<div className={ styles.userLinkInnerDiv }>
									<h1 className={ styles.nameHeader }>{ x.nameAndSurname }</h1>
								</div>
								<div className={ `${ styles.userLinkInnerDiv } ${ styles.smallDivsWrapper }` }>
									<div className={ styles.smallInnerDiv }>Имейл: <span
										className={ styles.colorSpan }>{ x.email }</span></div>
									<div className={ styles.smallInnerDiv }>Рейтинг: <span
										className={ styles.colorSpan }>{ x.rating }</span></div>
								</div>
								<div className={ styles.aboutDiv }>За мен: <span
									className={ styles.colorSpan }>{ x.about }</span></div>
							</Link>
						)) }
					</section>
					<section className={ `${ styles.contentSection } ${ styles.listingsSection }` }>
						<h1 className={ styles.header }>Обяви</h1>
						<div className={ styles.innerListingsDiv }>
							{ data.listings.map(x => (
								<ListingCard
									listing={ x }
									className={ styles.listingCard }
									headingClassName={ styles.listingCardHeading }
									namesClassName={styles.namesClassName}
									priceClassName={styles.priceClassName}
									profilePicClassName={styles.listingProfilePic}
								/>
							)) }
						</div>
					</section>
				</section>
			</MainPageLayout>
	)
}

export default Search