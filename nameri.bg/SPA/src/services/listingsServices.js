import { abstractFormDataRequest, abstractFetch } from "./abstracts.js"


const listingsServices = {
	getBest: async (count = 5) => abstractFetch(`/listings/best?count=${ count }`),
	getListing: async (_id) => abstractFetch(`/listings/${ _id }`),
	getListingDetails: async (_id) => abstractFetch(`/listings/details/${ _id }`),
	getUserListings: async (userId) => abstractFetch(`/listings/user/${ userId }`),
	createNewListing: async (formData) => abstractFormDataRequest('/listings/add', formData, "POST"),
	updateListing: async (listingId, formData) => abstractFormDataRequest(`/listings/edit/${ listingId }`, formData, "PUT"),
	search: async (search) => abstractFetch(`/listings/search?search=${ search }`),
	deleteListing: async (listingId) => abstractFetch(`/listings/delete/${ listingId }`, {}, "GET"),
}

export default listingsServices