const addListingFormValidator = (formData) => {
	const resultObj = {}

	// every check returns true if there is error, false if there is none.
	const validationObj = {
		category: (value) => value !== "Избери категория",
		subcategory: (value) => value !== "Избери подкатегория",
		town: (value) => value !== "Избери град",
		// images: (images) => images.some(x => x.type !== 'image/jpeg' || x.type !== 'image/jpg' || x.type !== 'image/png'),
		images: () => true,
		price: (value) => !isNaN(value) && value !== '' && value >= 0,
		priceNegotiation: (value) => value === 'on',
		details: (value) => value.length >= 10,
		heading: value => value.length >= 5,
		tags: value => value.length >= 2,
		files: () => true,
	}

	Object.entries(formData).forEach(field => {
		resultObj[field[0]] = validationObj[field[0]](field[1])
	})

	resultObj.price = resultObj.price || !!resultObj.priceNegotiation
	resultObj.subcategory = !((resultObj.category === true) && (resultObj.subcategory === false))

	return Object.entries(resultObj).every(([key, value]) => value === true)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

const profileEditFormValidator = (formData) => {
	const resultObj = {}

	const validationObj = {
		nameAndSurname: (value) => value.length >= 6,
		phone: (value) => value.length === 0 || (value.length !== 0 && !!/\+359[0-9]{9}|0[0-9]{9}/g.exec(value)),
		website: (value) => value.length === 0 || (value.length !== 0 && !!/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g.exec(value)),
		email: (value) => !!/^\S+@\S+$/g.exec(value),
		address: (value) => value.length === 0 || (value.length !== 0 && value.length >= 5),
		password: (value) => value.length === 0 || (value.length !== 0 && value.length >= 6),
		profileImg: () => true,
		about: (value) => value.length !== 0,
		repeatPassword: (value, pass) => value === pass,
	}

	Object.entries(formData).forEach(([formElementName, formElementValue]) => {
		if (validationObj[formElementName] !== undefined)
			resultObj[formElementName] = validationObj[formElementName](formElementValue, formData.password)
	})

	return Object.entries(resultObj).every(([_, value]) => value === true)
		? { valid: true, data: resultObj }
		: { valid: false, data: resultObj }
}

export { addListingFormValidator, profileEditFormValidator }