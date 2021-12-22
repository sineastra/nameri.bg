const { body } = require("express-validator")

const validateListing = () => [
	body("category")
		.isLength({ min: 1 })
		.withMessage("Category is required"),
	body("subcategory")
		.isLength({ min: 1 })
		.withMessage("Subcategory is required"),
	body("town")
		.isLength({ min: 1 })
		.withMessage("Town is required"),
	body("details")
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long."),
	body("heading")
		.isLength({ min: 5 })
		.withMessage("Heading must be at least 5 symbols long."),
	body("tags")
		.isLength({ min: 2 })
		.withMessage("Must have at least 2 tags!"),
]

const validateRegister = () => [
	body("nameAndSurname").isLength({ min: 1 }).withMessage("Names are required"),
	body("email").isEmail().withMessage("Not a valid email!"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 symbols!")
		.custom((value, { req }) => req.customValidators.doPasswordsMatch(value, req))
		.withMessage("Passwords do not match!"),
]

const validateLogin = () => [
	body("email").isEmail().withMessage("Must be a valid Email"),
]

const validateProfileEdit = () => [
	body("nameAndSurname")
		.isLength({ min: 6 })
		.withMessage('Names must be at least 6 characters long!'),
	body("phone")
		.custom((value, { req }) => req.customValidators.phoneValidator(value, req))
		.withMessage("Invalid phone."),
	body("website")
		.custom((value, { req }) => req.customValidators.websiteValidator(value, req))
		.withMessage("Invalid website."),
	body("email")
		.isEmail()
		.withMessage("Invalid email."),
	body("address")
		.custom((value, { req }) => req.customValidators.addressValidator(value, req))
		.withMessage("Invalid address."),
	body("password")
		.custom((value, { req }) => req.customValidators.editPasswordValidator(value, req))
		.withMessage("Password must be at least 6 symbols!")
		.custom((value, { req }) => req.customValidators.doPasswordsMatch(value, req))
		.withMessage("Passwords do not match!"),
]

module.exports = {
	validateListing,
	validateRegister,
	validateLogin,
	validateProfileEdit,
}