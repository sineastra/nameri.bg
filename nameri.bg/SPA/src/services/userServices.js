import { abstractFetch, abstractFormDataRequest, abstractPostFormRequest } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"

//TODO: make abstractPostRequest for handling post requests that are not FormData.
const userServices = {
	signIn: (formData) => abstractPostFormRequest(`/user/sign-in`, formData, "POST"),
	signUp: (formData) => abstractPostFormRequest(`/user/sign-up`, formData, "POST"),
	sendMessage: (receiverId, formData) => abstractPostFormRequest(`/user/send-message/${ receiverId }`, formData, "POST"),
	addReview: (reviewData, targetUserId, listingId) => abstractPostFormRequest(`/user/${ targetUserId }/add-review?listingId=${ listingId }`, reviewData, "POST"),
	getAllUserMessages: (userId) => abstractFetch(`/user/${ userId }/messages`),
	getSingleMessage: (messageId) => abstractFetch(`/user/message/${ messageId }`),
	getUserForProfile: (userId) => abstractFetch(`/user/profile/${ userId }`),
	editProfile: (userId, formData) => abstractFormDataRequest(`/user/edit/${ userId }`, formData, "PUT"),
	search: (search) => abstractFetch(`/user/search?search=${ search }`),
	logout: () => abstractFetch(`/user/logout`),
	checkListingOwnership: (listingId) => abstractFetch(`/user/is-own-listing/${ listingId }`),
	getTopUsers: (count) => abstractFetch(`/user/get-top?count=${ count }`),
}
export default userServices