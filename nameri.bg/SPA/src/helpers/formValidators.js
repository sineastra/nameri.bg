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

export { addListingFormValidator }