const { body } = require("express-validator")

const validateListing = () => [
	body("category")
		.isLength({ min: 1 })
		.withMessage("Category is required")
		.custom((value, { req }) => req.customValidators.doCategoryExists(value, req))
		.withMessage("Not a valid category!"),
	body("subcategory")
		.isLength({ min: 1 })
		.withMessage("Subcategory is required")
		.custom((value, { req }) => req.customValidators.doSubCategoryExists(value, req))
		.withMessage("Not a valid subcategory!"),
	body("town")
		.isLength({ min: 1 })
		.withMessage("Town is required")
		.custom((value, { req }) => req.customValidators.doTownExists(value, req))
		.withMessage("Not a valid town!"),
	body("price")
		.isInt({ min: 0 })
		.withMessage("Must be a number or 0 - for negotiation price"),
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

module.exports = {
	validateListing,
}