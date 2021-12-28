import { abstractFetch } from "./abstracts.js"


const townsServices = {
	getAll: async () =>
		await abstractFetch("/towns"),
}

export default townsServices