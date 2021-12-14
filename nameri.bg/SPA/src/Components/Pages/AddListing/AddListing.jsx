import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styles from "./AddListing.module.css"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import categoriesService from "../../../services/categoriesService.js"
import townsServices from "../../../services/townsServices.js"
import useFetch from "../../../hooks/useFetch.jsx"
import { addListingFormValidator } from "../../../helpers/formValidators.js"


const AddListing = () => {
	const [data, setData] = useState({ towns: null, categories: null })
	const [errors, setErrors] = useState({})
	const [isChecked, setIsChecked] = useState(false)
	const navigate = useNavigate()

	const fetchData = async () => {
		const [categories, towns] = await Promise.all([categoriesService.getAll(), townsServices.getAll()])

		setData({ categories, towns })
	}

	const { isLoading } = useFetch(fetchData)

	const submitHandler = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		const result = addListingFormValidator(formDataObj)

		if (result.valid) {
			//TODO make post request to express
		} else {
			setErrors(result.errors)
		}
	}

	const handleCheckBox = (e) => {
		setIsChecked(!!e.target.checked)
	}

	return (
		data.towns
			?
			<MainPageLayout>
				<form className={ styles.mainWrapper } method="POST" onSubmit={ submitHandler }>
					<div className={ styles.upperWrapper }>
						<div className={ styles.headingWrapper }>
							<h1 className={ styles.mainHeading }>Публикуване на нова обява</h1>

							{/*Start of Heading Input*/ }
							<input
								type="text"
								name="listingHeading"
								placeholder="Заглавие на твоята обява"
								className={ errors.headingError ? styles.invalidInput : '' }
							/>
							{ errors.headingError &&
								<div className={ styles.errorElement }>Заглавието трябва да е поне 5 символа!</div> }
							{/*End of Heading Input*/ }

						</div>

						{/*Start of Details Textarea*/ }
						<div className={ styles.textareaWrapper }>
						<textarea
							name="listingDescription"
							placeholder="Детайлно описание"
							className={ errors.detailsError ? styles.invalidInput : '' }
						/>
							{ errors.detailsError &&
								<div className={ styles.errorElement }>Описанието трябва да е поне 10 символа!</div> }
						</div>
						{/*End of Details Textarea*/ }

					</div>

					<div className={ styles.lowerWrapper }>
						{/*Start of Price Area*/ }
						<div className={ styles.priceWrapper }>
							<div className={ styles.halfInputContainer }>
								<input type="number" name="price" disabled={ isChecked } placeholder="Цена"
								       className={ styles.halfInput }/>
								<div className={ styles.priceCheckBoxWrapper }>
									<label htmlFor="priceNegotiation" className={ styles.checkBoxLabel }>По
										договаряне?</label>
									<input type="checkbox" name="priceNegotiation" id="priceNegotiation"
									       checked={ isChecked } onChange={ handleCheckBox }
									       className={ styles.checkBoxHolder }/>
								</div>
							</div>
							{/*End of Price Area*/ }

							{/*Start of Town Select*/ }
							<div className={ styles.halfInputContainer }>
								<select name="townSelect" className={ styles.halfInput }>
									<option defaultValue="0">Избери град</option>
									{ data?.towns.map((town, i) => (
										<option defaultValue={ i + 1 } key={ town._id }>{ town.name }</option>)) }
								</select>
							</div>
							{/*End of Town Select*/ }
						</div>

						{/*Start of Category Select*/ }
						<select name="categorySelect" className={ `${ styles.categorySelect } ${ styles.halfInput }` }>
							<option defaultValue="0">Избери категория</option>
							{ data?.categories.map((category, i) => (
								<option defaultValue={ i + 1 } key={ category._id }>{ category.name }</option>)) }
						</select>
						{/*End of Category Select*/ }

						<CustomInputFile className={ `${ styles.halfInput } ${ styles.customFileInput }` }/>

						<button type="submit" name="submit" className={ styles.submitBtn }>Изпрати</button>
					</div>
				</form>
			</MainPageLayout>
			: null
	)
}

export default AddListing