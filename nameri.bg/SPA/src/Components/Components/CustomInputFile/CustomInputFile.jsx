import styles from "./CustomInputFile.module.css"


const CustomInputFile = ({ className = "", onChange }) => {
	return (
		<label htmlFor="uploadFile" className={ `${ className } ${ styles.customUpload }` }>
			<span>Кликни тук за да избереш една или повече снимки!</span>
			<input type="file" name="images" multiple id="uploadFile" className={ styles.uploadInput }
			       onChange={ onChange }/>
		</label>
	)
}

export default CustomInputFile