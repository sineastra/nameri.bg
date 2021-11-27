import { abstractRequest } from "./abstracts.js"


const categoriesService = {
	getPopular: (count = 5) => abstractRequest(`/categories/popular?count=${ count }`),
	getWithMostSubCats: (count = 1) => abstractRequest(`/categories/with-most-sub-cats?count=${ count }`),
	getSubCategories: (id) => abstractRequest(`/categories/${ id }`),
	getSubCatListings: (id) => abstractRequest(`/categories/subcategories/${ id }`),
	getAll: () => abstractRequest('/categories'),
}

export default categoriesService