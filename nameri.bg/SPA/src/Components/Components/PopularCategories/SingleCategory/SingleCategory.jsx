import styles from "./SingleCategory.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import ImageLoadingPlaceholder from "../../ImageLoadingPlaceholder/ImageLoadingPlaceholder.jsx"


const SingleCategory = ({ _id, img, name, className }) => {
	const [imgLoaded, setImgLoaded] = useState(false)

	console.log(img)

	return (
		<>
			<Link
				className={ `${ styles.categContainer } ${ className } ${ imgLoaded ? styles.show : styles.hide }` }
				to={ `/categories/${ _id }` }>
				<img
					className={ styles.image }
					src={ img }
					alt="Popular Category Image"
					onLoad={ () => setImgLoaded(true) }
				/>
				<h3 className={ styles.categHeading }>{ name }</h3>
			</Link>
			<ImageLoadingPlaceholder
				outerClassName={ imgLoaded ? styles.hide : `${ styles.show } ${ styles.imgLoader } ${ className }` }/>
		</>
	)
}

export default SingleCategory