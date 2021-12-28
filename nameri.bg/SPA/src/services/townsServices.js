import { abstractFetch } from "./abstracts.js"


const townsServices = {
	getAll: () => abstractFetch("/towns"),
}

export default townsServices