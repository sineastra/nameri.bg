import styles from "./CustomInputFile.module.css"

// TODO: add state and logic for removing of images.

const CustomInputFile = ({ className = "", onChange, inputName = "", multiple = false, text = "Избери файлове" }) => {
	return (
		<label htmlFor="uploadFile" className={ `${ className } ${ styles.customUpload }` }>
			<span>{ text }</span>
			<input
				type="file"
				name={ inputName }
				multiple={ multiple }
				id="uploadFile"
				className={ styles.uploadInput }
				onChange={ onChange }
			/>
		</label>
	)
}

export default CustomInputFile