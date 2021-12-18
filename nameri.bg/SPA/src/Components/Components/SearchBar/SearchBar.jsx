import styles from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa"
import { IconContext } from "react-icons"


function SearchBar ({ placeholder, onSearchSubmit }) {
	return (
		<form className={ styles.searchContainer } onSubmit={ onSearchSubmit }>
			<input
				type="search"
				placeholder={ placeholder }
				className={ styles.searchInput }
				name="search"
			/>
			<button className={ `${ styles.searchBtn }` }>
				<IconContext.Provider value={ { className: styles.iconClassName } }>
					<FaSearch/>
				</IconContext.Provider>
			</button>
		</form>
	)
}

export default SearchBar