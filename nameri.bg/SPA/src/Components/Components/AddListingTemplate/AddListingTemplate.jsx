import styles from "./AddListingTemplate.module.css"
import CustomInputFile from "../CustomInputFile/CustomInputFile.jsx"
import { useEffect, useState } from "react"
import categoriesService from "../../../services/categoriesService.js"
import townsServices from "../../../services/townsServices.js"
import { useNavigate } from "react-router-dom"


const AddListingTemplate = () => {
	const [data, setData] = useState({ towns: null, categories: null })
	const [validFormData, setValidFormData] = useState(null)
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const [categories, towns] = await Promise.all([
				categoriesService.getAll(),
				townsServices.getAll(),
			])

			setData({ categories, towns })
		}

		fetchData()
	}, [])

	useEffect(() => {
		// TODO: to send the request once the file uploading logic is created for the CLOUD storaging on express.
		if (validFormData !== null) {
			navigate("/")
			// this is just for testing, delete the if after creating the logic
		}
	}, [validFormData])

	const submitHandler = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		formValidation(formDataObj)
	}

	const formValidation = (formData) => {
		const resultObj = {}

		// every check returns true if there is error, false if there is none.
		const validationObj = {
			categorySelect: (value) => value === "Избери категория",
			townSelect: (value) => value === "Избери град",
			imagesUpload: () => false,
			price: (value) => isNaN(value) || value === '' || value < 0,
			priceNegotiation: (value) => Boolean(value),
			listingDescription: (value) => value.length < 10,
			listingHeading: value => value.length < 5,
		}

		Object.entries(formData).forEach(field => {
			resultObj[field[0]] = validationObj[field[0]](field[1])
		})

		resultObj.price = (Boolean(resultObj.priceNegotiation) === resultObj.price)

		Object.entries(resultObj).every(([key, value]) => value === false)
			? setValidFormData(formData)
			: setErrors(resultObj)
	}

	return (
		data.towns
			? <form className={ styles.mainWrapper } method="POST" onSubmit={ submitHandler }>
				<div className={ styles.upperWrapper }>
					<div className={ styles.headingWrapper }>
						<h1>Публикуване на нова обява</h1>

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
					<div className={ styles.priceWrapper }>
						<input type="number" name="price" placeholder="Цена" className={ styles.smallInputs }/>
					</div>
					<div>
						<label htmlFor="priceNegotiation">По договаряне?</label>
						<input type="checkbox" name="priceNegotiation" id="priceNegotiation" defaultChecked={ false }/>
					</div>
					<select name="townSelect" className={ styles.smallInputs }>
						<option defaultValue="0">Избери град</option>
						{ data?.towns.map((town, i) => (
							<option defaultValue={ i + 1 } key={ town._id }>{ town.name }</option>
						)) }
					</select>
					<select name="categorySelect" className={ `${ styles.categorySelect } ${ styles.smallInputs }` }>
						<option defaultValue="0">Избери категория</option>
						{ data?.categories.map((category, i) => (
							<option defaultValue={ i + 1 } key={ category._id }>{ category.name }</option>
						)) }
					</select>
					<CustomInputFile className={ styles.smallInputs }/>
					<button type="submit" name="submit" className={ styles.submitBtn }>Изпрати</button>
				</div>
			</form>
			: null
	)
}

export default AddListingTemplate