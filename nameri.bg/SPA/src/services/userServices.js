import { abstractFetch, abstractFormDataRequest, abstractPostFormRequest } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"

//TODO: make abstractPostRequest for handling post requests that are not FormData.
const userServices = {
	signIn: async (formData) =>
		await abstractPostFormRequest(`/user/sign-in`, formData, "POST"),
	signUp: async (formData) =>
		await abstractPostFormRequest(`/user/sign-up`, formData, "POST"),
	sendMessage: async (receiverId, formData) =>
		await abstractPostFormRequest(`/user/send-message/${ receiverId }`, formData, "POST"),
	addReview: async (reviewData, targetUserId, listingId) =>
		await abstractPostFormRequest(`/user/${ targetUserId }/add-review?listingId=${ listingId }`, reviewData, "POST"),
	getAllUserMessages: async (userId) => await abstractFetch(`/user/${ userId }/messages`),
	getSingleMessage: async (messageId) => await abstractFetch(`/user/message/${ messageId }`),
	getUserForProfile: async (userId) => await abstractFetch(`/user/profile/${ userId }`),
	editProfile: async (userId, formData) => await abstractFormDataRequest(`/user/edit/${ userId }`, formData, "PUT"),
	search: async (search) => await abstractFetch(`/user/search?search=${ search }`),
	logout: async () => await abstractFetch(`/user/logout`),
	checkListingOwnership: async (listingId) => await abstractFetch(`/user/is-own-listing/${ listingId }`),
	getTopUsers: async (count) => await abstractFetch(`/user/get-top?count=${ count }`),
}
export default userServices