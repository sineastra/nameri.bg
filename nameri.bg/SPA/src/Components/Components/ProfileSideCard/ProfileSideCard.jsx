import styles from "./ProfileSideCard.module.css"
import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"
import RatingBox from "../RatingBox/RatingBox.jsx"
import { useContext } from "react"
import UserContext from "../../Contexts/UserContext.jsx"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"
import { Link } from "react-router-dom"


const ContactsInfo = ({ user }) => {
	return <div className={ styles.contactsInfo }>
		<div><span className={ styles.contactsLabel }>Телефон:</span>
			{ user.phone
				? <span className={ styles.contactsContent }> { `+359 ${ user.phone }` }</span>
				: <span className={ styles.contactsEmptyContent }> (няма телефон)</span> }
		</div>
		<div><span className={ styles.contactsLabel }>Имейл:</span>ca
			<span className={ styles.contactsContent }> { user.email }</span>

		</div>
		<div><span className={ styles.contactsLabel }>Адрес:</span>
			{ user.address
				? <span className={ styles.contactsContent }> { user.address }</span>
				: <span className={ styles.contactsEmptyContent }> (няма адрес)</span>
			}
		</div>
		<div><span className={ styles.contactsLabel }>Уебсайт:</span>
			{ user.website
				? <span className={ styles.contactsContent }> { user.website }</span>
				: <span className={ styles.contactsEmptyContent }> (няма уебсайт)</span>
			}
		</div>
	</div>
}

const EditProfile = () => {
	return (
		<div className={ styles.profileLinksWrapper }>
			<Link className={ styles.profileLink } to="/profile/edit">Редактирай</Link>
			<Link className={ styles.profileLink } to="/">Абонаментни планове</Link>
		</div>
	)
}

const SingleSkill = ({ skillName, title }) => {

	return (
		<IconContext.Provider value={ { color: "green" } }>
			<div key={ skillName } className={ styles.singleSkillInnerWrapper } title={ title }>
				<div className={ styles.singleSkillIconDiv }><FaCheck/></div>
				<div className={ styles.singleSkillTextDiv }>{ skillName }</div>
			</div>
		</IconContext.Provider>
	)
}

const Certificate = ({ data }) => {

	return (
		<div key={ data.heading + data.institution } className={ styles.singleCertifInnerWrapper }>
			<div className={ styles.certifEntryWrapper }>
				<div className={ styles.certifSingleRow }>Име на сертификат:</div>
				<div className={ `${ styles.bolderNunito } ${ styles.certifSingleRow }` }>{ data.heading }</div>
			</div>
			<div className={ styles.certifEntryWrapper }>
				<div className={ styles.certifSingleRow }>Институция:</div>
				<div className={ `${ styles.bolderNunito } ${ styles.certifSingleRow }` }>{ data.institution }</div>
			</div>
			<div className={ styles.certifEntryWrapper }>
				<div className={ styles.certifSingleRow }>Датa от-до:</div>
				<div
					className={ `${ styles.bolderNunito } ${ styles.certifSingleRow }` }>{ data.from } - { data.to }</div>
			</div>
		</div>
	)
}

const ProfileSideCard = ({ className, user, openModal }) => {
	const [loggedUser] = useContext(UserContext)
	const isOwn = loggedUser && loggedUser._id === user._id

	return (
		<div className={ `${ styles.mainWrapper } ${ className }` }>
			<div className={ styles.headingWrapper }>
				<div className={ styles.mainHeading }>{ user.nameAndSurname }</div>
				<RatingBox user={ user } rating={ user.rating } showVotes={ true }/>
			</div>
			{ isOwn ? <EditProfile/> : '' }

			<div className={ styles.aboutWrapper }>
				<div className={ styles.mainHeading }>За Мен</div>
				<ContactsInfo user={ user }/>
				{ (!isOwn && loggedUser) &&
					<StyledBtn onClick={ openModal } className={ styles.styledBtn }>Съобщение</StyledBtn> }
				<hr/>
				<div className={ styles.about }>{ user.about }</div>
			</div>

			<div className={ styles.skillsOuterWrapper }>
				<div className={ styles.mainHeading }>Умения:</div>
				<div className={ styles.skillsInnerWrapper }>
					{ user.skills.length > 0
						? user.skills.map(skillName => (
							<SingleSkill skillName={ skillName } title={ skillName }/>
						))
						: <div className={ styles.noSkills }>Няма умения</div>
					}
				</div>
			</div>

			{/*<div className={ styles.singleCertifOuterWrapper }>*/ }
			{/*	<div className={ styles.mainHeading }>Дипломи и Сертификати</div>*/ }
			{/*	{ user.diplomasAndCertifs.map(data => <Certificate data={ data }/>) }*/ }
			{/*</div>*/ }
		</div>
	)
}

export default ProfileSideCard