import SearchBar from "../SearchBar/SearchBar.jsx"
import styles from "./CategoriesPagesHeader.module.css"
import { useEffect } from "react"


const CategoriesPagesHeader = ({ categoryName, className, onSearchChange, onSearchSubmit }) => {

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	return (
		<section className={ `${ styles.headingOuter } ${ className }` }>
			<div className={ styles.headingInner }>
				<h1 className={styles.mainHeader}>{ categoryName }</h1>
			</div>
			<div className={ `${ styles.headingInner } ${ styles.headingInnerSearch }` }>
				<div className={ styles.searchBarWrapper }>
					<SearchBar
						placeholder={ "Търси категория" }
						onSearchSubmit={ onSearchSubmit }
						onSearchChange={ onSearchChange }/>
				</div>
			</div>
		</section>
	)
}

export default CategoriesPagesHeader