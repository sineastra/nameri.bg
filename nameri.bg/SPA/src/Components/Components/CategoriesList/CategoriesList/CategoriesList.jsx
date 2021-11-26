import styles from "./CategoriesList.module.css"
import SingleListCategory from "../SingleListCategory/SingleListCategory.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../../services/categoriesService.js"


const CategoriesList = () => {
	const [subCats, setSubCats] = useState([])

	useEffect(async () => {
		const data = await categoriesService.getWithMostSubCats(2)

		setSubCats(data)
	}, [])

	return (
		<section className={ styles.randomCategoriesCont }>
			<div className={ styles.randomCatsInnerCont }>
				{ subCats.map(x => (
					<div className={ styles.randomCatsSingleCont }>
						<h1 className={ styles.mainHeader }>{ x.name }</h1>
						<div className={ styles.innerRandom } key={ x.name }>
							{ x.listings.map(y => (
								<SingleListCategory key={ y._id }
								                    heading={ y.heading }
								                    servicesCount={ y.services }
								                    className={ `${ styles.singleCat } ${ styles.subHeader }` }
								/>))
							}
						</div>
					</div>
				)) }
			</div>
		</section>
	)
}

export default CategoriesList