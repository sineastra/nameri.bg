import SingleCategory from "../SingleCategory/SingleCategory.jsx"
import popularCat1 from "../../../../assets/images/popular-cat1.jpg"
import popularCat2 from "../../../../assets/images/popular-cat2.jpg"
import popularCat3 from "../../../../assets/images/popular-cat3.jpg"
import popularCat4 from "../../../../assets/images/popular-cat4.jpg"


const PopularCategories = ({ wrapperClass }) => {

	return (
		<section className={wrapperClass}>
			<SingleCategory img={popularCat1} name={'Category 1'}/>
			<SingleCategory img={popularCat2} name={'Category 2'}/>
			<SingleCategory img={popularCat3} name={'Category 3'}/>
			<SingleCategory img={popularCat4} name={'Category 4'}/>
		</section>
	)
}

export default PopularCategories