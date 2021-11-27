import { abstractFetch } from "./abstracts.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"


const userServices = {
	signIn: async (formData) =>
		await abstractFetch(`/user/sign-in`, stringifyFetchBody(formData, "POST")),
	signUp: async (formData) =>
		await abstractFetch(`/user/sign-up`, stringifyFetchBody(formData, "POST")),

}
export default userServices