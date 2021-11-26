import { baseRequest } from "./bases.js"


const listingsServices = {
	getBest: async (count = 5) => baseRequest(`/listings/best?count=${ count }`),
}

export default listingsServices