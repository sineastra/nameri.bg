import { abstractRequest } from "./abstracts.js"


const townsServices = {
	getAll: async () =>
		await abstractRequest("/towns"),
}

export default townsServices