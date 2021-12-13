import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import HeadPageBanner from "../../Components/HeadPageBanner/HeadPageBanner/HeadPageBanner.jsx"
import SiteAdvertBanner from "../../Components/SiteAdvertBanner/SiteAdvertBanner.jsx"
import PopularCategories from "../../Components/PopularCategories/PopularCategories/PopularCategories.jsx"
import CategoriesList from "../../Components/CategoriesList/CategoriesList/CategoriesList.jsx"
import { useEffect, useState } from "react"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import { useNavigate } from "react-router-dom"
import listingsServices from "../../../services/listingsServices.js"
import categoriesService from "../../../services/categoriesService.js"
import useFetch from "../../../hooks/useFetch.jsx"
import HomePageContext from "../../Contexts/HomePageContext.jsx"


const HomePage = () => {
	const [homePageContext, setHomePageContext] = useState({})

	const fetchData = async () => {
		const [listings, popularCategories, subCategories] = await Promise.all([
			listingsServices.getBest(2),
			categoriesService.getPopular(8),
			categoriesService.getWithMostSubCats(2),
		])

		setHomePageContext({ ...homePageContext, listings, popularCategories, subCategories })
	}

	const { isLoadingData } = useFetch(fetchData)

	return (
		isLoadingData
			? <Spinner/>
			: <HomePageContext.Provider value={ [homePageContext, setHomePageContext] }>
				<MainPageLayout>
					<HeadPageBanner/>

					<main>
						<PopularCategories/>
						<CategoriesList/>
					</main>

					<SiteAdvertBanner/>
				</MainPageLayout>
			</HomePageContext.Provider>
	)
}

export default HomePage