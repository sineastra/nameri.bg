import styles from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { IconContext } from "react-icons"


function SearchBar ({ placeholder }) {
	const navigate = useNavigate()

	const submitSearch = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData)

		if (formDataObj.search !== "") {
			navigate(`/search?search=${ formDataObj.search }`)
		}
	}

	return (
		<form className={ styles.searchContainer } onSubmit={ submitSearch }>
			<input type="search" placeholder={ placeholder } className={ styles.searchInput } name="search"/>
			<button className={ `${ styles.searchBtn }` }>
				<IconContext.Provider value={ { className: styles.iconClassName } }>
					<FaSearch/>
				</IconContext.Provider>
			</button>
		</form>
	)
}

export default SearchBar