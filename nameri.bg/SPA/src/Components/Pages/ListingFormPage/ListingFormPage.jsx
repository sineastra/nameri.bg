import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./ListingFormPage.module.css"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import categoriesService from "../../../services/categoriesService.js"
import townsServices from "../../../services/townsServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import { addListingFormValidator } from "../../../helpers/formValidators.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import TagInput from "../../Components/TagInput/TagInput.jsx"
import StyledBtn from "../../Components/StyledBtn/StyledBtn.jsx"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


const fetchDataAdd = async () => {
	const [categories, towns] = await Promise.all([categoriesService.getAll(), townsServices.getAll()])

	return { categories, towns }
}

const fetchDataEdit = async (listingId) => {
	const [categories, towns, listing] = await Promise.all([categoriesService.getAll(), townsServices.getAll(), listingsServices.getListing(listingId)])

	return { categories, towns, listing }
}

const postData = async (formType, formData, id) =>
	formType === 'edit'
		? await listingsServices.updateListing(id, formData)
		: await listingsServices.createNewListing(formData)

const AddListing = ({ formType }) => {
	const params = useParams()
	const navigate = useNavigate()
	const { processRequest } = useContext(UtilityContext)
	const { isLoadingData, setIsLoadingData, data } = useFetch(formType === 'edit'
			? () => fetchDataEdit(params.id)
			: fetchDataAdd,
		[formType])
	const [subCats, setSubCats] = useState([])
	const [images, setImages] = useState([])
	const [tags, setTags] = useState([])
	const [price, setPrice] = useState("")
	const [isChecked, setIsChecked] = useState(false)
	const [validationErrors, setvalidationErrors] = useState({})

	useEffect(() => {
		if (data && data.listing) {
			setSubCats(data.listing.category.subcategories)
			setImages(data.listing.images)
			setIsChecked(data.listing.price == 0)
			setPrice(data.listing.price != 0 ? data.listing.price : '')
			setTags(data.listing.tags)
		}
	}, [data])

	const submitHandler = async (e) => {
		e.preventDefault()
		setIsLoadingData(true)

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		let formDataWithAddedStates = {
			...formDataObj,
			town: formDataObj.town,
			category: formDataObj.category,
			subcategory: formDataObj.subcategory,
			tags: JSON.stringify(tags),
			images,
			price: isChecked ? 0 : price,
		}
		const validationResult = addListingFormValidator(formDataWithAddedStates)

		if (validationResult.valid) {

			const formDataFinal = Object.entries(formDataWithAddedStates).reduce((a, [key, value]) => {
				if (key === 'images') {
					value.forEach((imgFile, i) => a.append('image' + i, imgFile))
				} else {
					a.append(key, value)
				}

				return a
			}, new FormData())

			const data = await processRequest(() => postData(formType, formDataFinal, params.id))

			if (data !== undefined) {
				navigate(`/details/${ data._id }`)
			} else {
				setIsLoadingData(false)
				setSubCats([])
			}

		} else {
			setIsLoadingData(false)
			setvalidationErrors(validationResult.data)
		}
	}

	const changeCategory = async (e) => {
		const selectedIndex = e.target.selectedIndex
		const optionElement = e.target.childNodes[selectedIndex]
		const categoryId = optionElement.getAttribute('id')

		if (categoryId !== null && categoryId !== undefined) {
			const data = await processRequest(() => categoriesService.getSubCategories(categoryId))

			if (data) {
				setSubCats(data.subcategories)
			}
		} else {
			setSubCats([])
		}
	}

	const addTag = (e) => {
		if (e.key === " " && e.target.value.trim() !== '') {
			const value = e.target.value.trim()

			if (tags.every(x => x !== value)) {
				setTags(oldTags => [...oldTags, value])
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
	const handlePriceChange = (e) => {
		setPrice(e.target.value)
	}
	const clearError = (error) => {
		setvalidationErrors(oldErrors => ({ ...oldErrors, [error]: true }))
	}
	const handleCheckBox = (e) => {
		setIsChecked(!!e.target.checked)
	}

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<form className={ styles.mainWrapper } onSubmit={ submitHandler }>
					<div className={ styles.upperWrapper }>
						<div className={ styles.headingWrapper }>
							<h1 className={ styles.mainHeading }>
								{ data.listing ? `Редактиране на обява:` : 'Публикуване на нова обява' }
							</h1>

							{/*Start of Heading Input*/ }
							<input
								type="text"
								name="heading"
								placeholder="Заглавие на твоята обява"
								className={ validationErrors.heading === false ? styles.invalidInput : '' }
								onFocus={ () => clearError('heading') }
								defaultValue={ data.listing ? data.listing.heading : '' }
							/>
							{ validationErrors.heading === false &&
								<div className={ styles.errorElement }>Заглавието трябва да е поне 5 символа!</div> }
							{/*End of Heading Input*/ }
						</div>

						{/*Start of Details Textarea*/ }
						<div className={ styles.textareaWrapper }>
							<textarea
								name="details"
								placeholder="Детайлно описание"
								className={ validationErrors.details === false ? styles.invalidInput : '' }
								onFocus={ () => clearError('details') }
								defaultValue={ data.listing ? data.listing.details : '' }
							/>
							{ validationErrors.details === false &&
								<div className={ styles.errorElement }>Описанието трябва да е поне 10 символа!</div> }
						</div>
						{/*End of Details Textarea*/ }

						<TagInput
							wrapperClassName={ styles.tagsInputWrapper }
							inputName="tags"
							onFocus={ () => clearError('tags') }
							onKeyPress={ addTag }
							data={ tags }
							errors={ validationErrors }
							removeDataEntry={ removeTag }
							inputText="Тагове (Добави със спейс)"
						/>
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
									className={ `${ validationErrors.price === false ? styles.invalidInput : '' }` }
									onFocus={ () => clearError('price') }
									onChange={ handlePriceChange }
									value={ price }
								/>
								{ validationErrors.price === false &&
									<div className={ styles.errorElement }>Цената е задължителна... </div>
								}
								<div className={ styles.priceCheckBoxWrapper }>
									<label htmlFor="priceNegotiation" className={ styles.checkBoxLabel }>По
										договаряне?</label>
									<input type="checkbox" name="priceNegotiation" id="priceNegotiation"
									       checked={ isChecked }
									       onChange={ handleCheckBox }
									       onFocus={ () => clearError('price') }
									       className={ styles.checkBoxHolder }
									/>
								</div>
							</div>
							{/*End of Price Area*/ }

							{/*Start of Town Select*/ }
							<div className={ styles.halfInputContainer }>
								<select
									name="town"
									className={ `${ styles.halfInput } ${ validationErrors.town === false ? styles.invalidInput : '' }` }
									onFocus={ () => clearError('town') }
									defaultValue={ data.listing ? data.listing.town._id : "townDefault" }>
									<option value="townDefault" disabled>-- избери град --</option>
									{ data.towns.map(town => (
										<option
											value={ town._id }
											key={ town._id }>{ town.name }
										</option>
									)) }
								</select>
								{ validationErrors.town === false &&
									<div className={ styles.errorElement }>Моля избери град... </div> }
							</div>
							{/*End of Town Select*/ }
						</div>

						{/*Start of Category Select*/ }
						<select
							name="category"
							className={ `${ styles.categorySelect } ${ styles.halfInput } ${ validationErrors.category === false ? styles.invalidInput : '' }` }
							onChange={ changeCategory }
							onFocus={ () => clearError('category') }
							defaultValue={ data.listing ? data.listing.category._id : "categoryDefault" }>
							<option value="categoryDefault" disabled>-- избери категория --</option>
							{ data?.categories.map(category => (
								<option value={ category._id }
								        key={ category._id }
								        id={ category._id }>{ category.name }
								</option>
							)) }
						</select>
						{ validationErrors.category === false &&
							<div className={ styles.errorElement }>Моля избери категория... </div> }
						{/*End of Category Select*/ }

						{/*Start of Subcategory Select*/ }
						<select
							name="subcategory"
							className={ `${ styles.categorySelect } ${ styles.halfInput } ${ validationErrors.subcategory === false ? styles.invalidInput : '' }` }
							disabled={ subCats.length === 0 }
							onFocus={ () => clearError('subcategory') }
							defaultValue={ data.listing ? data.listing.subcategory._id : '' }>
							{ subCats.map(subCat => (
								<option value={ subCat._id } key={ subCat._id }>{ subCat.name }</option>)) }
						</select>
						{ validationErrors.subcategory === false &&
							<div className={ styles.errorElement }>Моля избери подкатегория... </div> }
						{/*End of Subcategory Select*/ }

						<CustomInputFile
							className={ `${ styles.halfInput } ${ styles.customFileInput }` }
							onChange={ addImages }
							inputName="images"
							multiple={ true }
							text="Кликни тук за да избереш една или повече снимки за обявата ти!"
						/>

						<StyledBtn type="submit" name="submit" className={ styles.submitBtn }>Изпрати</StyledBtn>
					</div>
				</form>
			</MainPageLayout>
	)
}

//TODO: add images visualisation. like div in which you can remove images.

export default AddListing