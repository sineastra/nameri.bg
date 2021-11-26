import SingleCategory from "../SingleCategory/SingleCategory.jsx"


const PopularCategoriesRow = ({ wrapperClass, data }) => {

	return (
		<section className={ wrapperClass }>
			{ data.map(x => (
				<SingleCategory img={ x.img } name={ x.name } key={ x._id } _id={ x._id }/>
			)) }
		</section>
	)
}

export default PopularCategoriesRow