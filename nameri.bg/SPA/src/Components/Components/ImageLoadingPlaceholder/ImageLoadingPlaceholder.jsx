import styles from "./ImageLoadingPlaceholder.module.css"


const ImageLoadingPlaceholder = ({ outerClassName = '', innerClassName = '' }) => {

	return (
		<div className={ `${ styles.loadWrapper } ${ outerClassName }` }>
			<div className={ `${ styles.loadingContent } ${ innerClassName }` }/>
		</div>
	)
}

export default ImageLoadingPlaceholder