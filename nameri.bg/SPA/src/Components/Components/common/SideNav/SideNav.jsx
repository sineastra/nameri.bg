import styles from "./SideNav.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"


const SideNav = ({ className, toggleSideBar, user, logout }) => {
	const [userNavVisibility, setUserNavVisibility] = useState(false)
	const profileImg = user && user.profileImg && user.profileImg !== '' ? user.profileImg : "/profile.png"

	const toggleUserNavVisibility = () => setUserNavVisibility(oldState => !oldState)
	const toggleSideNavVisibility = () => {
		setUserNavVisibility(false)
		toggleSideBar()
	}

	return (<div className={ `${ styles.sideNav } ${ className }` }>
		<div onClick={ toggleSideNavVisibility } className={ styles.closeBtn }>X</div>
		{ user ? <div className={ styles.linksWrapper }>
			<div className={ styles.userNavLinks }>
				<div className={ styles.userMetaWrapper }>
					<img src={ profileImg } alt="" className={ styles.profileImg }/>
					<h1 className={ styles.userNames } onClick={ toggleUserNavVisibility }>Здравей, <span
						className={ styles.userNamesSpan }>{ user.nameAndSurname }</span></h1>
				</div>
				<div
					className={ `${ userNavVisibility ? styles.show : styles.hidden } ${ styles.userNavLinksInner }` }>
					<Link className={ `${ styles.userNavLinkInner } ${ styles.navLink }` }
					      to={ `/profile/${ user._id }` }>Профил</Link>
					<Link
						className={ `${ styles.userNavLinkInner }  ${ styles.navLink }` }
						to={ `/profile/edit` }>Редактирай профил</Link>
					<Link
						className={ `${ styles.userNavLinkInner }  ${ styles.navLink }` }
						to={ `/add-listing` }>Добави обява</Link>
					<div
						className={ `${ styles.userNavLinkInner }  ${ styles.navLink } ${ styles.lastUserLink }` }
						onClick={ logout }>Излез
					</div>
				</div>
			</div>
			<Link className={ styles.navLink } to="/categories">Категории</Link>
			<Link className={ styles.navLink } to="/about">За платформата</Link>
			<Link className={ styles.navLink } to="/top-users">Топ потребители</Link>
		</div> : <div className={ styles.linksWrapper }>
			<Link className={ styles.navLink } to="/sign-in">Влез</Link>
			<Link className={ styles.navLink } to="/sign-up">Регистрирай се</Link>
		</div> }
	</div>)
}

export default SideNav