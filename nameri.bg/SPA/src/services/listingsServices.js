import { abstractGetRequest, formDatafileUploadPostRequest } from "./abstracts.js"


const listingsServices = {
	getBest: async (count = 5) => abstractGetRequest(`/listings/best?count=${ count }`),
	getListing: async (_id) => abstractGetRequest(`/listings/${ _id }`),
	getListingDetails: async (_id) => abstractGetRequest(`/listings/details/${ _id }`),
	getUserListings: async (userId) => abstractGetRequest(`/listings/user/${ userId }`),
	createNewListing: async (data) => formDatafileUploadPostRequest('/listings/add', data),
}

export default listingsServices