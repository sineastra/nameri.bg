import { abstractGetRequest } from "./abstracts.js"


const listingsServices = {
	getBest: async (count = 5) => abstractGetRequest(`/listings/best?count=${ count }`),
	getListing: async (_id) => abstractGetRequest(`/listings/${ _id }`),
	getListingDetails: async (_id) => abstractGetRequest(`/listings/details/${ _id }`),
	getUserListings: async (userId) => abstractGetRequest(`/listings/user/${ userId }`),
}

export default listingsServices