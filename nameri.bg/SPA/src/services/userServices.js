import { abstractFetch, abstractGetRequest } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"


const userServices = {
	signIn: async (formData) =>
		await abstractFetch(`/user/sign-in`, stringifyFetchBody(formData, "POST")),
	signUp: async (formData) =>
		await abstractFetch(`/user/sign-up`, stringifyFetchBody(formData, "POST")),
	getAllUserMessages: async (userId) => await abstractGetRequest(`/user/${ userId }/messages`),
	getSingleMessage: async (messageId) => await abstractGetRequest(`/user/message/${ messageId }`),
}
export default userServices