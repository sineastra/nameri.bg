import { baseFetch } from "./bases.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"


const userServices = {
	signIn: async (formData) =>
		await baseFetch(`/user/sign-in`, stringifyFetchBody(formData, "POST")),
	signUp: async (formData) =>
		await baseFetch(`/user/sign-up`, stringifyFetchBody(formData, "POST")),

}
export default userServices