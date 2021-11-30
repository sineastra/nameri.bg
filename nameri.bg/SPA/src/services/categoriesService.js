import { abstractGetRequest } from "./abstracts.js"


const categoriesService = {
	getPopular: (count = 5) => abstractGetRequest(`/categories/popular?count=${ count }`),
	getWithMostSubCats: (count = 1) => abstractGetRequest(`/categories/with-most-sub-cats?count=${ count }`),
	getSubCategories: (id) => abstractGetRequest(`/categories/${ id }`),
	getSubCatListings: (id) => abstractGetRequest(`/categories/subcategories/${ id }`),
	getAll: () => abstractGetRequest('/categories'),
}

export default categoriesService