import { abstractGetRequest, abstractFormDataRequest, abstractFetch } from "./abstracts.js"


const listingsServices = {
	getBest: async (count = 5) => abstractGetRequest(`/listings/best?count=${ count }`),
	getListing: async (_id) => abstractGetRequest(`/listings/${ _id }`),
	getListingDetails: async (_id) => abstractGetRequest(`/listings/details/${ _id }`),
	getUserListings: async (userId) => abstractGetRequest(`/listings/user/${ userId }`),
	createNewListing: async (formData) => abstractFormDataRequest('/listings/add', formData, "POST"),
	updateListing: async (listingId, formData) => abstractFormDataRequest(`/listings/edit/${ listingId }`, formData, "PUT"),
	search: async (search) => abstractGetRequest(`/listings/search?search=${ search }`),
	deleteListing: async (listingId) => abstractFetch(`/listings/delete/${ listingId }`, {}, "GET"),
}

export default listingsServices