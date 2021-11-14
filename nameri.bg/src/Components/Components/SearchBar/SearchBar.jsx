import styles from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa"


function SearchBar ({ placeholder }) {
	return (
		<div className={styles.searchContainer}>
			<input type="search" placeholder={placeholder} className={styles.searchInput}/>
			<button className={`${styles.searchBtn}`}>
				<FaSearch/>
			</button>
		</div>
	)
}

export default SearchBar