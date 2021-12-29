import { abstractFetch } from "./abstracts.js"


const categoriesService = {
	getPopular: (count = 5) => abstractFetch(`/categories/popular?count=${ count }`),
	getWithMostSubCats: (count = 1) => abstractFetch(`/categories/with-most-sub-cats?count=${ count }`),
	getSubCategories: (id) => abstractFetch(`/categories/${ id }`),
	getSubCatListings: (id, query) => abstractFetch(`/categories/subcategories/${ id }?${ query }`),
	getAll: () => abstractFetch('/categories'),
}

export default categoriesService