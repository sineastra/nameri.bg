import { abstractFormDataRequest, abstractFetch } from "./abstracts.js"


const listingsServices = {
	getBest: (count = 5) => abstractFetch(`/listings/best?count=${ count }`),
	getListing: (_id) => abstractFetch(`/listings/${ _id }`),
	getListingDetails: (_id) => abstractFetch(`/listings/details/${ _id }`),
	createNewListing: (formData) => abstractFormDataRequest('/listings/add', formData, "POST"),
	updateListing: (listingId, formData) => abstractFormDataRequest(`/listings/edit/${ listingId }`, formData, "PUT"),
	search: (search) => abstractFetch(`/listings/search?search=${ search }`),
	deleteListing: (listingId) => abstractFetch(`/listings/delete/${ listingId }`, {}, "GET"),

}

export default listingsServices