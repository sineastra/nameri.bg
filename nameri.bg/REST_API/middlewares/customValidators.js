const doPasswordsMatch = (value, req) => {
	if (value !== req.body.repeatPassword) {
		throw new Error("Password confirmation does not match password")
	}

	return true
}

const doCategoryExists = async (value, req) => {
	//TODO: refactor these. await the result if null then reject no need for iterating.
	const categoryNames = await req.dbServices.categoriesServices.getAllCategoryNames()

	if (categoryNames.every(categName => categName.name !== value)) {
		return Promise.reject()
	}
}
const doSubCategoryExists = async (value, req) => {
	const subcategoryNames = await req.dbServices.categoriesServices.getAllSubCategoryNames()

	if (subcategoryNames.every(subCategName => subCategName.name !== value)) {
		return Promise.reject()
	}
}

const doTownExists = async (value, req) => {
	const townsNames = await req.dbServices.townsServices.getAllNames()

	if (townsNames.every(townName => townName.name !== value)) {
		return Promise.reject()
	}
}

module.exports = (req, res, next) => {
	req.customValidators = {
		doPasswordsMatch,
		doCategoryExists,
		doTownExists,
		doSubCategoryExists,
	}

	next()
}
