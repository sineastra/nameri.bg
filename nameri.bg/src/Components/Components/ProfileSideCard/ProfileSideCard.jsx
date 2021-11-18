import styles from "./ProfileSideCard.module.css"
import { FaCheck } from "react-icons/fa"
import { IconContext } from "react-icons"
import RatingBox from "../RatingBox/RatingBox.jsx"


const ContactsInfo = ({ user }) => {
	return <div className={ styles.contactsInfo }>
		<div>Телефон: { user.phone }</div>
		<div>Имейл: { user.email }</div>
		<div>Адрес: { user.address }</div>
		<div>Уебсайт: { user.website }</div>
	</div>
}

const EditProfile = () => {
	return <>
		<div>Редактирай</div>
		<div>Абонаментни планове</div>
	</>
}

const SingleSkill = ({ skillName }) => {

	return (
		<IconContext.Provider value={ { color: "green" } }>
			<div key={ skillName } className={ styles.singleSkillInnerWrapper }>
				<FaCheck/>
				{ skillName }
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

const ProfileSideCard = (props) => {
	const dataFromContext = {
		isOwn: false,
		premiumPlan: 2,
		user: {
			fullName: 'Pesho Kalibrata',
			votedUsers: 1500,
			rating: 1.1,
			ratingTitle: 'Not Cool Guy',
			about: 'I am not cool guy. I am hot guy.',
			phone: '111',
			email: 'asd@asd.asd',
			address: 'Pesho str',
			website: 'abv.bg',
			skills: ['peshizum', 'ciklizum', 'traktorizum'],
			diplomasAndCertifs: [{
				heading: 'Peshov Certificat',
				institution: 'Peshova Instituciq',
				from: '11.11.1111',
				to: '12.11.1111',
			}],
		},
	}

	const shouldSeeContacts = dataFromContext.isOwn || Number(dataFromContext.premiumPlan) >= 2

	return (
		<div className={ styles.mainWrapper }>
			<div className={ styles.headingWrapper }>
				<div className={ styles.mainHeading }>{ dataFromContext.user.fullName }</div>
				<RatingBox user={ dataFromContext.user }/>
			</div>
			{ dataFromContext.isOwn ? <EditProfile/> : '' }

			<div className={ styles.aboutWrapper }>
				<div className={ styles.mainHeading }>За Мен</div>
				{ shouldSeeContacts && <ContactsInfo user={ dataFromContext.user }/> }
				<div>Съобщение</div>
				<hr/>
				<div>{ dataFromContext.user.about }</div>
			</div>

			<div className={ styles.skillsOuterWrapper }>
				<div className={ styles.mainHeading }>Умения:</div>
				<div className={ styles.skillsInnerWrapper }>
					{ dataFromContext.user.skills.map(skillName => {

						return (
							<div className={ styles.singleSkillOuterWrapper }>
								<SingleSkill skillName={ skillName }/>
							</div>
						)
					}) }
				</div>
			</div>

			<div className={ styles.singleCertifOuterWrapper }>
				<div className={ styles.mainHeading }>Дипломи и Сертификати</div>
				{ dataFromContext.user.diplomasAndCertifs.map(data => <Certificate data={ data }/>) }
			</div>
		</div>
	)
}

export default ProfileSideCard