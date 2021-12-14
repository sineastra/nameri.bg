const addListingFormValidator = (formData) => {
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

	return Object.entries(resultObj).every(([key, value]) => value === false)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

const profileEditFormValidator = (formData) => {
	const resultObj = {}

	const validationObj = {
		nameAndSurname: (value) => value.length <= 6,
		phone: (value) => value.length !== 0 && !value.match(/\+359[0-9]{9}|0[0-9]{9}/g),
		website: (value) => value.length !== 0 && !value.match(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g),
		email: (value) => !value.match(/^\S+@\S+$/g),
		address: (value) => value.length <= 5 && value.length !== 0,
		password: (value) => value.length <= 5 && value.length !== 0,
		repeatPassword: (value, pass) => value !== pass,
	}

	Object.entries(formData).forEach(([formElementName, formElementValue]) => {
		if (validationObj[formElementName] !== undefined)
			resultObj[formElementName] = validationObj[formElementName](formElementValue, formData.password)
	})

	return Object.entries(resultObj).every(([key, value]) => value === false)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

export { addListingFormValidator, profileEditFormValidator }