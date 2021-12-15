import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./AddListing.module.css"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import categoriesService from "../../../services/categoriesService.js"
import townsServices from "../../../services/townsServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import { addListingFormValidator } from "../../../helpers/formValidators.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import Tag from "../../Components/Tag/Tag.jsx"


const AddListing = () => {
	const [data, setData] = useState({ towns: null, categories: null })
	const [subCats, setSubCats] = useState([])
	const [tags, setTags] = useState([])
	const [images, setImages] = useState([])
	const [errors, setErrors] = useState({})
	const [isChecked, setIsChecked] = useState(false)
	const navigate = useNavigate()

	const fetchData = async () => {
		const [categories, towns] = await Promise.all([categoriesService.getAll(), townsServices.getAll()])

		setData({ categories, towns })
	}

	const { isLoadingData } = useFetch(fetchData)

	const clearError = (error) => {
		setErrors(oldErrors => ({ ...oldErrors, [error]: true }))
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const data = Object.fromEntries(formData)
		const formDataWithAddedStates = { ...data, tags, images }

		const validationResult = addListingFormValidator(formDataWithAddedStates)

		// outer if- else catches validation errors on the front-end. Inner if-else catches validation errors
		// from the back-end and the try-catch - everything else (network errors, server errors, etc)

		if (validationResult.valid) {
			try {
				formDataWithAddedStates.price = !!data.priceNegotiation ? 0 : data.price

				const formDataFinal = Object.entries(formDataWithAddedStates).reduce((a, [key, value]) => {
					if (key === 'images') {
						value.forEach((imgFile, i) => a.append('image' + i, imgFile))
					} else {
						a.append(key, value)
					}

					return a
				}, new FormData())

				const response = await listingsServices.createNewListing(formDataFinal)

				if (response.ok) {
					navigate(`/details/${ response.data._id }`)
				} else {
					setErrors(response.errors)
				}
			} catch (e) {
				navigate('/error', {
					state: {
						statusCode: e.statusCode, status: e.status, msg: e.msg,
					},
				})
			}
		} else {
			setErrors(validationResult.data)
		}
	}

	const handleCheckBox = (e) => {
		setIsChecked(!!e.target.checked)
	}

	const changeCategory = async (e) => {
		const selectedIndex = e.target.selectedIndex
		const optionElement = e.target.childNodes[selectedIndex]
		const categoryId = optionElement.getAttribute('id')

		if (categoryId !== null && categoryId !== undefined) {
			const response = await categoriesService.getSubCategories(categoryId)

			setSubCats(response.subcategories)
		} else {
			setSubCats([])
		}
	}

	const addTag = (e) => {
		if (e.key === " ") {
			const value = e.target.value.trim()

			if (tags.every(x => x !== value)) {
				setTags([...tags, e.target.value.trim()])
			}

			e.target.value = ''
		}
	}

	const removeTag = (text) => {
		setTags(oldTags => oldTags.filter(x => x !== text))
	}

	const addImages = (e) => {
		const images = e.target.files

		setImages(oldImages => [...oldImages, ...images])
	}

	return (isLoadingData ? <Spinner/> : <MainPageLayout>
		<form className={ styles.mainWrapper } method="POST" onSubmit={ submitHandler }>
			<div className={ styles.upperWrapper }>
				<div className={ styles.headingWrapper }>
					<h1 className={ styles.mainHeading }>Публикуване на нова обява</h1>

					{/*Start of Heading Input*/ }
					<input
						type="text"
						name="heading"
						placeholder="Заглавие на твоята обява"
						className={ errors.heading === false ? styles.invalidInput : '' }
						onFocus={ () => clearError('heading') }
					/>
					{ errors.heading === false &&
						<div className={ styles.errorElement }>Заглавието трябва да е поне 5 символа!</div> }
					{/*End of Heading Input*/ }

				</div>

				{/*Start of Details Textarea*/ }
				<div className={ styles.textareaWrapper }>
							<textarea
								name="details"
								placeholder="Детайлно описание"
								className={ errors.details === false ? styles.invalidInput : '' }
								onFocus={ () => clearError('details') }
							/>
					{ errors.details === false &&
						<div className={ styles.errorElement }>Описанието трябва да е поне 10 символа!</div> }
				</div>
				{/*End of Details Textarea*/ }

				<div className={ styles.tagsInputWrapper }>
					<input
						type="text"
						name="tags"
						placeholder="Тагове (Добави със спейс)"
						onKeyPress={ addTag }
						autoComplete="off"
						className={ errors.tags === false ? styles.invalidInput : '' }
						onFocus={ () => clearError('tags') }
					/>
					<div
						className={ `${ styles.tagsDiv } ${ tags.length > 0 ? styles.showTagsDiv : styles.hideTagsDiv }` }>
						{ tags.map(x => <Tag text={ x } removeTag={ () => removeTag(x) }/>) }
					</div>
					{ errors.tags === false && <div className={ styles.errorElement }>Минимум 2 тага!</div> }
				</div>
			</div>


			<div className={ styles.lowerWrapper }>
				{/*Start of Price Area*/ }
				<div className={ styles.priceWrapper }>
					<div className={ styles.halfInputContainer }>
						<input
							type="number"
							name="price"
							disabled={ isChecked }
							placeholder="Цена"
							className={ `${ styles.halfInput } ${ errors.price === false ? styles.invalidInput : '' }` }
							onFocus={ () => clearError('price') }
						/>
						{ errors.price === false &&
							<div className={ styles.errorElement }>Цената е задължителна... </div> }
						<div className={ styles.priceCheckBoxWrapper }>
							<label htmlFor="priceNegotiation" className={ styles.checkBoxLabel }>По
								договаряне?</label>
							<input type="checkbox" name="priceNegotiation" id="priceNegotiation"
							       checked={ isChecked }
							       onChange={ handleCheckBox }
							       onFocus={ () => clearError('price') }
							       className={ styles.checkBoxHolder }/>
						</div>
					</div>
					{/*End of Price Area*/ }

					{/*Start of Town Select*/ }
					<div className={ styles.halfInputContainer }>
						<select
							name="town"
							className={ `${ styles.halfInput } ${ errors.town === false ? styles.invalidInput : '' }` }
							onFocus={ () => clearError('town') }>
							<option defaultValue="0">Избери град</option>
							{ data?.towns.map((town, i) => (
								<option defaultValue={ i + 1 } key={ town._id }>{ town.name }</option>)) }
						</select>
						{ errors.town === false &&
							<div className={ styles.errorElement }>Моля избери град... </div> }
					</div>
					{/*End of Town Select*/ }
				</div>

				{/*Start of Category Select*/ }
				<select
					name="category"
					className={ `${ styles.categorySelect } ${ styles.halfInput } ${ errors.category === false ? styles.invalidInput : '' }` }
					onChange={ changeCategory }
					onFocus={ () => clearError('category') }>
					<option defaultValue="0">Избери категория</option>
					{ data?.categories.map((category, i) => (<option defaultValue={ i + 1 } key={ category._id }
					                                                 id={ category._id }>{ category.name }</option>)) }
				</select>
				{ errors.category === false &&
					<div className={ styles.errorElement }>Моля избери категория... </div> }
				{/*End of Category Select*/ }

				{/*Start of Subcategory Select*/ }
				<select
					name="subcategory"
					className={ `${ styles.categorySelect } ${ styles.halfInput } ${ errors.subcategory === false ? styles.invalidInput : '' }` }
					disabled={ subCats.length === 0 }
					onFocus={ () => clearError('subcategory') }>
					<option defaultValue="0">Избери Подкатегория</option>
					{ subCats.map((subCat, i) => (
						<option defaultValue={ i + 1 } key={ subCat._id }>{ subCat.name }</option>)) }
				</select>
				{ errors.subcategory === false &&
					<div className={ styles.errorElement }>Моля избери подкатегория... </div> }
				{/*End of Subcategory Select*/ }

				<CustomInputFile
					className={ `${ styles.halfInput } ${ styles.customFileInput }` }
					onChange={ addImages }
				/>

				<button type="submit" name="submit" className={ styles.submitBtn }>Изпрати</button>
			</div>
		</form>
	</MainPageLayout>)
}

//TODO: add images visualisation. like div in which you can remove images.

export default AddListing