import styles from "./TagInput.module.css"
import Tag from "../Tag/Tag.jsx"


const TagInput = ({
	                  inputName = 'tags',
	                  wrapperClassName = "",
	                  onKeyUp,
	                  onFocus,
	                  removeDataEntry,
	                  errors,
	                  data,
	                  inputText,
	                  onChange,
                  }) => {

	return (
		<div className={ wrapperClassName }>
			<input
				type="text"
				name={ inputName }
				placeholder={ inputText }
				onKeyUp={ onKeyUp }
				onFocus={ onFocus }
				autoComplete="off"
				onChange={ onChange }
				className={ errors.tags === false ? styles.invalidInput : '' }
			/>
			<div
				className={ `${ styles.tagsDiv } ${ data.length > 0 ? styles.showTagsDiv : styles.hideTagsDiv }` }>
				{ data.map(x => <Tag key={ x } text={ x } removeDataEntry={ () => removeDataEntry(x) }/>) }
			</div>
			{ errors.tags === false && <div className={ styles.errorElement }>Минимум 2 тага!</div> }
		</div>
	)
}

export default TagInput