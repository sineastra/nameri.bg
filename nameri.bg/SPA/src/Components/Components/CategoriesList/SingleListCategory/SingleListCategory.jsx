import styles from "./SingleListCategory.module.css"


const SingleListCategory = ({ className = '', heading, servicesCount }) => {

	return (
		<div className={ `${ styles.singleCatCont } ${ className }` }>
			<div>{ heading }</div>
			<div>{ servicesCount }</div>
		</div>
	)
}

export default SingleListCategory