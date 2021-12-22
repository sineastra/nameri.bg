import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./ListingFormPage.module.css"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import categoriesService from "../../../services/categoriesService.js"
import townsServices from "../../../services/townsServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import { addListingFormValidator } from "../../../helpers/formValidators.js"
import listingsServices from "../../../services/listingsServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import TagInput from "../../Components/TagInput/TagInput.jsx"
import StyledBtn from "../../Components/StyledBtn/StyledBtn.jsx"


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
	const { isLoadingData, data } = useFetch(formType === 'edit'
			? () => fetchDataEdit(params.id)
			: fetchDataAdd,
		[formType])
	const [isLoadingComponent, setIsLoadingComponent] = useState(true)
	const [subCats, setSubCats] = useState([])
	const [images, setImages] = useState([])
	const [tags, setTags] = useState([])
	const [price, setPrice] = useState("")
	const [isChecked, setIsChecked] = useState(false)
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		if (data.listing) {
			setSubCats(data.listing.category.subcategories)
			setImages(data.listing.images)
			setIsChecked(data.listing.price === 0)
			setPrice(data.listing.price !== 0 ? data.listing.price : '')
			setTags(data.listing.tags)
		}

		setIsLoadingComponent(false)
	}, [data])

	const submitHandler = async (e) => {
		e.preventDefault()
		setIsLoadingComponent(true)

		const formData = new FormData(e.target)
		const data = Object.fromEntries(formData)

		let formDataWithAddedStates = {
			...data,
			town: data.town,
			category: data.category,
			subcategory: data.subcategory,
			tags: JSON.stringify(tags),
			images,
			price: isChecked ? 0 : price,
		}
		const validationResult = addListingFormValidator(formDataWithAddedStates)

		if (validationResult.valid) {
			try {
				const formDataFinal = Object.entries(formDataWithAddedStates).reduce((a, [key, value]) => {
					if (key === 'images') {
						value.forEach((imgFile, i) => a.append('image' + i, imgFile))
					} else {
						a.append(key, value)
					}

					return a
				}, new FormData())

				const response = await postData(formType, formDataFinal, params.id)

				if (response.ok) {
					navigate(`/details/${ response.data._id }`)
				} else {
					setErrors(response.errors)
				}
			} catch (e) {
				navigate('/error')
			}
		} else {
			setErrors(validationResult.data)
		}
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
		setErrors(oldErrors => ({ ...oldErrors, [error]: true }))
	}
	const handleCheckBox = (e) => {
		setIsChecked(!!e.target.checked)
	}

	return (
		isLoadingData || isLoadingComponent
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
								className={ errors.heading === false ? styles.invalidInput : '' }
								onFocus={ () => clearError('heading') }
								defaultValue={ data.listing ? data.listing.heading : '' }
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
								defaultValue={ data.listing ? data.listing.details : '' }
							/>
							{ errors.details === false &&
								<div className={ styles.errorElement }>Описанието трябва да е поне 10 символа!</div> }
						</div>
						{/*End of Details Textarea*/ }

						<TagInput
							wrapperClassName={ styles.tagsInputWrapper }
							inputName="tags"
							onFocus={ () => clearError('tags') }
							onKeyPress={ addTag }
							data={ tags }
							errors={ errors }
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
									className={ `${ styles.halfInput } ${ errors.price === false ? styles.invalidInput : '' }` }
									onFocus={ () => clearError('price') }
									onChange={ handlePriceChange }
									value={ price }
								/>
								{ errors.price === false &&
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
									className={ `${ styles.halfInput } ${ errors.town === false ? styles.invalidInput : '' }` }
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
						{ errors.category === false &&
							<div className={ styles.errorElement }>Моля избери категория... </div> }
						{/*End of Category Select*/ }

						{/*Start of Subcategory Select*/ }
						<select
							name="subcategory"
							className={ `${ styles.categorySelect } ${ styles.halfInput } ${ errors.subcategory === false ? styles.invalidInput : '' }` }
							disabled={ subCats.length === 0 }
							onFocus={ () => clearError('subcategory') }
							defaultValue={ data.listing ? data.listing.subcategory._id : '' }>
							{ subCats.map(subCat => (
								<option value={ subCat._id } key={ subCat._id }>{ subCat.name }</option>)) }
						</select>
						{ errors.subcategory === false &&
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