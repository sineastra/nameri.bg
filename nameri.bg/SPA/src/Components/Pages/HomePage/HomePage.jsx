import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import HeadPageBanner from "../../Components/HeadPageBanner/HeadPageBanner/HeadPageBanner.jsx"
import SiteAdvertBanner from "../../Components/SiteAdvertBanner/SiteAdvertBanner.jsx"
import PopularCategories from "../../Components/PopularCategories/PopularCategories/PopularCategories.jsx"
import CategoriesList from "../../Components/CategoriesList/CategoriesList/CategoriesList.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import listingsServices from "../../../services/listingsServices.js"
import categoriesService from "../../../services/categoriesService.js"
import useFetch from "../../../hooks/useFetch.jsx"
import HomePageContext from "../../Contexts/HomePageContext.jsx"


const fetchData = async () => {
	let [listings, popularCategories, subCategories] = await Promise.all([
		listingsServices.getBest(5),
		categoriesService.getPopular(8),
		categoriesService.getWithMostSubCats(2),
	])

	return { listings, popularCategories, subCategories }
}

const HomePage = () => {
	const { isLoadingData, data, setData } = useFetch(fetchData)

	return (
		isLoadingData
			? <Spinner/>
			: <HomePageContext.Provider value={ [data, setData] }>
				<HeadPageBanner/>

				<main>
					<PopularCategories/>
					<CategoriesList/>
				</main>

				<SiteAdvertBanner/>
			</HomePageContext.Provider>
	)
}

export default HomePage