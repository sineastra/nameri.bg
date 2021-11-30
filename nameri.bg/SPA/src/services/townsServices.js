import { abstractGetRequest } from "./abstracts.js"


const townsServices = {
	getAll: async () =>
		await abstractGetRequest("/towns"),
}

export default townsServices