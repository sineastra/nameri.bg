const basicIteration = (formDataObj, validationObj, resultObj) => {
	Object.entries(formDataObj).forEach(([formElementName, formElementValue]) => {
		if (validationObj[formElementName] !== undefined)
			resultObj[formElementName] = validationObj[formElementName](formElementValue, formDataObj.password)
	})

	return Object.entries(resultObj).every(([_, value]) => value === true)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

const addListingFormValidator = (formDataObj) => {
	const resultObj = {}

	// every check returns true if there is error, false if there is none.
	const validationObj = {
		category: (value) => !!value && value !== "Избери категория",
		subcategory: (value) => !!value && value !== "Избери подкатегория",
		town: (value) => !!value && value !== "Избери град",
		// images: (images) => images.some(x => x.type !== 'image/jpeg' || x.type !== 'image/jpg' || x.type !== 'image/png'),
		images: () => true,
		price: (value) => !isNaN(value) && value !== '' && value >= 0,
		details: (value) => value.length >= 10,
		heading: value => value.length >= 5,
		tags: value => JSON.parse(value).length >= 2,
		files: () => true,
	}

	Object.entries(formDataObj).filter(([key, _]) => key !== 'priceNegotiation').forEach(field => {
		resultObj[field[0]] = validationObj[field[0]](field[1])
	})

	resultObj.subcategory = !((resultObj.category === true) && (resultObj.subcategory === false))

	return Object.entries(resultObj).every(([key, value]) => value === true)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

const profileEditFormValidator = (formDataObj) => {
	const resultObj = {}

	const validationObj = {
		nameAndSurname: (value) => value.length >= 6,
		phone: (value) => value.length === 0 || (value.length !== 0 && !!/\+359[0-9]{9}|0[0-9]{9}/g.exec(value)),
		website: (value) => value.length === 0 || (value.length !== 0 && !!/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g.exec(value)),
		email: emailValidator,
		address: (value) => value.length === 0 || (value.length !== 0 && value.length >= 5),
		password: (value) => value.length === 0 || (value.length !== 0 && value.length >= 6),
		profileImg: () => true,
		about: () => true,
		repeatPassword: (value, pass) => value === pass,
	}

	return basicIteration(formDataObj, validationObj, resultObj)
}

const registerFormValidator = (formDataObj) => {
	const resultObj = {}

	const validationObj = {
		email: emailValidator,
		password: (value) => value.length >= 6,
		repeatPassword: (value, repeatValue) => value === repeatValue,
		terms: (value) => !!value,
		nameAndSurname: (value) => value.length > 0,
	}

	return basicIteration(formDataObj, validationObj, resultObj)
}

const emailValidator = (value) => {
	return !!/^\S+@\S+$/g.exec(value)
}

//TODO: think about extracting all basicIterations into function

export { addListingFormValidator, profileEditFormValidator, registerFormValidator, emailValidator }