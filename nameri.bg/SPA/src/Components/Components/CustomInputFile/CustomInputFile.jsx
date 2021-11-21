import styles from "./CustomInputFile.module.css"


const CustomInputFile = ({ className = "" }) => {
	return <label htmlFor="uploadFile" className={ `${ className } ${ styles.customUpload }` }>
		<span>Кликни тук за да избереш една или повече снимки!</span>
		<input type="file" name="imagesUpload" multiple id="uploadFile" className={ styles.uploadInput }/>
	</label>
}

export default CustomInputFile