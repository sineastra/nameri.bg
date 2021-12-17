import { abstractFetch, abstractFormDataRequest, abstractGetRequest } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"

//TODO: make abstractPostRequest for handling post requests that are not FormData.
const userServices = {
	signIn: async (formData) =>
		await abstractFetch(`/user/sign-in`, stringifyFetchBody(formData, "POST")),
	signUp: async (formData) =>
		await abstractFetch(`/user/sign-up`, stringifyFetchBody(formData, "POST")),
	getAllUserMessages: async (userId) => await abstractGetRequest(`/user/${ userId }/messages`),
	getSingleMessage: async (messageId) => await abstractGetRequest(`/user/message/${ messageId }`),
	getUserForProfile: async (userId) => await abstractGetRequest(`/user/profile/${ userId }`),
	editProfile: async (userId, formData) => await abstractFormDataRequest(`/user/edit/${ userId }`, formData, "PUT"),
	search: async (search) => await abstractGetRequest(`/user/search?search=${ search }`),
	sendMessage: async (receiverId, formData) => await abstractFetch(`/user/send-message/${ receiverId }`, stringifyFetchBody(formData, "POST")),
}
export default userServices