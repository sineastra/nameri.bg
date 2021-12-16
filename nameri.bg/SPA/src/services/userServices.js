import { abstractFetch, abstractFormDataRequest, abstractGetRequest } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"


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
}
export default userServices