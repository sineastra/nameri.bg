import { abstractRequest } from "./abstracts.js"


const listingsServices = {
	getBest: async (count = 5) => abstractRequest(`/listings/best?count=${ count }`),
	getListing: async (_id) => abstractRequest(`/listings/${ _id }`),
	getListingDetails: async (_id) => abstractRequest(`/listings/details/${ _id }`),
}

export default listingsServices