import baseFetch from "./baseFetch.js"
import { stringifyFetchBody } from "../helpers/stringifyFetchBody.js"


const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const userServices = {
	signIn: async (formData) =>
		await baseFetch(`${ baseUrl }/user/sign-in`, stringifyFetchBody(formData, "POST")),
	signUp: async (formData) =>
		await baseFetch(`${ baseUrl }/user/sign-up`, stringifyFetchBody(formData, "POST")),

}
export default userServices