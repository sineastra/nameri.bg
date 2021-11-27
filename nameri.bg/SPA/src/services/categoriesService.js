import { baseRequest } from "./bases.js"


const categoriesService = {
	getPopular: (count = 5) => baseRequest(`/categories/popular?count=${ count }`),
	getWithMostSubCats: (count = 1) => baseRequest(`/categories/with-most-sub-cats?count=${ count }`),
	getSubCategories: (categoryId) => baseRequest(`/categories/${ categoryId }`),
}

export default categoriesService