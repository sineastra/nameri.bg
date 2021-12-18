import styles from "./UserHeader.module.css"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { GoMail } from "react-icons/go"
import { useContext, useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import userServices from "../../../services/userServices.js"
import UserContext from "../../Contexts/UserContext.jsx"


const UserHeader = ({ className }) => {
	const [user, setUser] = useContext(UserContext)
	const [showSubheader, setShowSubHeader] = useState(false)
	const subHeaderRef = useRef(null)
	const profileImg = user && user.profileImg !== "" ? user.profileImg : "/profile.svg"

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

	const logout = async () => {
		try {
			const response = await userServices.logout()

			console.log(response)
			if (response.ok) {
				setUser(null)
			}
		} catch (e) {
			console.log(e)
		}

	}

	return (
		<div
			className={ `${ user === null ? styles.guestWrapper : styles.loggedInWrapper } ${ styles.wrapper } ${ className }` }>
			{ user === null
				? <Link to={ '/sign-in' }
				        className={ `${ styles.mainNavLink } ${ styles.authLink }` }>Влез</Link>
				: <div className={ styles.loggedInUserWrapper }>
					<div>
						<Link className={ styles.styledLink } to={ "/add-listing" }>
							Добави услуга
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
								<ul className={ styles.subHeaderUl }>
									<li className={ styles.subHeaderLink }>
										<Link to={ `/profile/${ user._id }` }>Профил</Link>
									</li>
									<li className={ styles.subHeaderLink }>
										<Link to={ `/profile/edit` }>Редактирай профил</Link>
									</li>
									<li className={ styles.subHeaderLink } onClick={ logout }>Излез</li>
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