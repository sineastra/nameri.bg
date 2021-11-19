import styles from "./AddServiceTemplate.module.css"
import CustomInputFile from "../CustomInputFile/CustomInputFile.jsx"


const AddServiceTemplate = () => {

	const mainCategories = [
		{
			id: 1,
			name: 'category1',
		},
		{
			id: 2,
			name: 'category2',
		},
		{
			id: 3,
			name: 'category3',
		},
	]

	const ajaxUseEffectData = ['subCat1', 'subCat2', 'subCat3']

	return (
		<div className={ styles.mainWrapper }>
			<div className={ styles.upperWrapper }>
				<div className={ styles.headingWrapper }>
					<h1>Публикуване на нова обява</h1>
					<input type="text" name="serviceHeading" placeholder="Заглавие на твоята обява"/>
				</div>
				<textarea name="serviceDescription" placeholder="Детайлно описание"/>
			</div>
			<div className={ styles.lowerWrapper }>
				<input type="number" name="price" placeholder="Цена" className={ styles.smallInputs }/>
				<input type="text" name="townSelect" placeholder="Избери град" className={ styles.smallInputs }/>
				<select name="categorySelect" className={ `${ styles.categorySelect } ${ styles.smallInputs }` }>
					<option value="0">Избери категория</option>
					{ mainCategories.map(x => (
						<option value={ x.id } key={ x.id }>{ x.name }</option>
					)) }
				</select>
				<CustomInputFile className={ styles.smallInputs }/>
				<button type="submit" name="submit" className={ styles.submitBtn }>Изпрати</button>
			</div>
		</div>
	)
}

export default AddServiceTemplate