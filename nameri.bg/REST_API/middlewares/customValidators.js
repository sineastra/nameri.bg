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

const phoneValidator = async (value, req) =>
	value.length === 0 || (value.length !== 0 && /\+359[0-9]{9}|0[0-9]{9}/g.exec(value))

const websiteValidator = async (value, req) =>
	value.length === 0 || (value.length !== 0 && /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g.exec(value))

const addressValidator = async (value, req) =>
	value.length === 0 || (value.length !== 0 && value.length >= 5)

const editPasswordValidator = async (value, req) =>
	value.length === 0 || (value.length !== 0 && value.length >= 6)

module.exports = (req, res, next) => {
	req.customValidators = {
		doPasswordsMatch,
		doCategoryExists,
		doTownExists,
		doSubCategoryExists,
		phoneValidator,
		websiteValidator,
		addressValidator,
		editPasswordValidator,
	}

	next()
}
