import styles from "./UserHeader.module.css"
import { Link, useNavigate } from "react-router-dom"
import { IconContext } from "react-icons"
import { GoMail } from "react-icons/go"
import { useContext, useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import userServices from "../../../services/userServices.js"
import UserContext from "../../Contexts/UserContext.jsx"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"


const UserHeader = ({ className, user, logout }) => {
	const [showSubheader, setShowSubHeader] = useState(false)
	const subHeaderRef = useRef(null)
	const profileImg = user && user.profileImg !== "" ? user.profileImg : "/profile.png"

	useEffect(() => {
		document.addEventListener('click', outerClick)

		return () => document.removeEventListener('click', outerClick)
	}, [])

	const toggleSubHeader = () => {
		setShowSubHeader(oldState => !oldState)
	}

	const outerClick = (e) => {
		if (subHeaderRef.current && !subHeaderRef.current.contains(e.target)) {
			setShowSubHeader(false)
		}
	}

	const wrapperClassName = `${
		user === null
			? styles.guestWrapper
			: styles.loggedInWrapper } ${ styles.wrapper } ${ className }`

	return (
		<div className={ wrapperClassName }>
			{ user === null
				? <Link to={ '/sign-in' }
				        className={ `${ styles.mainNavLink } ${ styles.authLink }` }>Влез</Link>
				: <div className={ styles.loggedInUserWrapper }>
					<div>
						<Link to={ "/add-listing" } className={ styles.styledLink }>
							<StyledBtn text="Добави услуга"/>
						</Link>
					</div>
					<IconContext.Provider value={ { className: styles.msgIconClassName } }>
						<Link to="/messages">
							<GoMail/>
						</Link>
					</IconContext.Provider>
					<div className={ styles.userProfileImgWrapper } ref={ subHeaderRef }>
						<img
							src={ profileImg }
							alt=""
							className={ styles.userProfileImg }
							onClick={ toggleSubHeader }
						/>
						{ showSubheader &&
							<div className={ styles.subHeaderWrapper }>
								<div className={ styles.userNames }>Здравей, <span
									className={ styles.userNamesSpan }>{ user.nameAndSurname }</span></div>
								<ul className={ styles.subHeaderUl }>
									<li className={ styles.subHeaderLinkWrapper }>
										<Link to={ `/profile/${ user._id }` }
										      className={ styles.subHeaderLink }>Профил</Link>
									</li>
									<li className={ styles.subHeaderLinkWrapper }>
										<Link to={ `/profile/edit` } className={ styles.subHeaderLink }>Редактирай
											профил</Link>
									</li>
									<li className={ styles.subHeaderLinkWrapper } onClick={ logout }>Излез</li>
								</ul>
							</div>
						}
					</div>
				</div>
			}
		</div>
	)
}

export default UserHeader