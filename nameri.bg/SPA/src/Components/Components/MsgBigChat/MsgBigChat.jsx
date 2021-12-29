import styles from "./MsgBigChat.module.css"
import { AiOutlineMail } from "react-icons/ai"
import { IconContext } from "react-icons"
import userServices from "../../../services/userServices.js"
import { Link } from "react-router-dom"
import { useContext, useEffect, useRef } from "react"
import UserContext from "../../Contexts/UserContext.jsx"
import UtilityContext from "../../Contexts/UtilityContext.jsx"


const NonPickedMsg = ({ className = '' }) => {

	return (<div className={ `${ styles.mainWrapper } ${ styles.mainWrapperEmpty } ${ className }` }>
		<div className={ `${ styles.innerWrapper } ${ styles.innerWrapperEmpty }` }>
			<div className={ styles.noPostWrapper }>
				<IconContext.Provider value={ { className: styles.mailIcon } }>
					<AiOutlineMail/>
				</IconContext.Provider>
			</div>
		</div>
	</div>)
}

const PickedMsg = ({ data, index, setData, className = '' }) => {
	const lastMsg = useRef(null)
	const [user] = useContext(UserContext)
	const { processRequest } = useContext(UtilityContext)
	const pickedMsg = data.conversations[index]

	// getting all the participants in the chat, and mapping them to LINK that leads into their profile.
	const participants = pickedMsg.participants
		.filter(x => x._id !== user._id)
		.map(x =>
			<Link to={ `/profile/${ x._id }` } className={ styles.participantLink }
			      key={ x._id }>{ x.nameAndSurname }</Link>,
		)

	// when last message in a chat changes, this effect here scrolls it into view.
	useEffect(() => {
		if (lastMsg.current !== null) {
			lastMsg.current.scrollIntoView({ behavior: "auto", block: 'nearest', inline: 'start' })
		}
	}, [pickedMsg])

	// this defines if it is your message or not (for different colors and placements in the chat)
	const defineMsgClassName = (userId, messageSenderId) => {
		return userId === messageSenderId ? styles.singleMsgOwn : styles.singleMsgNotOwn
	}

	//TODO: this must be changed if you want to implement mass messages.
	const sendNewMessage = async (e) => {
		e.preventDefault()

		const message = e.target.newMsg.value
		const receiverId = pickedMsg.participants.find(x => x._id !== user._id)._id

		if (message.value !== '') {
			const data = await processRequest(() => userServices.sendMessage(receiverId, { message }))

			if (data !== undefined) {
				e.target.newMsg.value = ''
				setData(data)
			}
		}
	}

	return (
		<div className={ `${ styles.mainWrapper } ${ styles.mainWrapperNonEmpty } ${ className }` }>
			<div className={ styles.innerWrapper }>
				<div className={ styles.userNameHeader }>
					<Link to={ `/profile/${ user._id }` } className={ styles.participantLink }>Аз</Link>
					<span>, { participants } </span>
				</div>
				<div className={ styles.messagesContainer }>
					{ pickedMsg.messages.map(message => (
						<div className={ styles.singleMsgWrapper } key={ message._id }>
							<div
								className={ `${ styles.singleMsg } ${ defineMsgClassName(user._id, message.sender) }` }>
								{ message.text }
							</div>
						</div>))
					}
					<div className={ styles.newMsgFormWrapper }>
						<form className={ styles.newMsgForm } onSubmit={ sendNewMessage }>
							<input className={ styles.sendMsgInput } placeholder="напиши съобщение..." name="newMsg"/>
							<button className={ styles.sendMsgButton }>изпрати</button>
						</form>
					</div>
				</div>
				<div className={ styles.dummyDiv } ref={ lastMsg }/>
			</div>
		</div>
	)
}

const MsgBigChat = ({ data, index, setData, className = '' }) => {
	return data && index !== null
		? <PickedMsg { ...{ data, index, setData, className } }/>
		: <NonPickedMsg { ...{ className } }/>

}

export default MsgBigChat