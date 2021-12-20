import styles from "./MsgBigChat.module.css"
import { AiOutlineMail } from "react-icons/ai"
import { IconContext } from "react-icons"
import uid from "../../../helpers/uniqueIDGenerator.js"
import userServices from "../../../services/userServices.js"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import ErrorContext from "../../Contexts/ErrorContext.jsx"
import extractErrorMessages from "../../../helpers/extractErrorMessages.js"


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
	const navigate = useNavigate()
	const [errors, setErrors] = useContext(ErrorContext)
	const pickedMsg = data.conversations[index]
	const participants = pickedMsg.participants.map(x => x.nameAndSurname).join(",")
	const lastMsg = useRef(null)

	useEffect(() => {
		if (lastMsg.current !== null) {
			lastMsg.current.scrollIntoView({ behavior: "auto", block: 'nearest', inline: 'start' })
		}
	}, [pickedMsg])

	const defineMsgClassName = (userId, messageSenderId) => {
		return userId === messageSenderId ? styles.singleMsgOwn : styles.singleMsgNotOwn
	}

	//TODO: this must be changed if you want to implement mass messages.
	const sendNewMessage = async (e) => {
		e.preventDefault()

		const message = e.target.newMsg.value
		const receiverId = pickedMsg.participants.find(x => x._id !== pickedMsg.user._id)._id

		if (message.value !== '') {
			try {
				const response = await userServices.sendMessage(receiverId, { message })

				if (response.ok) {
					if (lastMsg.current !== null) {
						setData(response.data)
					}
				} else {
					setErrors(extractErrorMessages(response.errors))
				}
			} catch (e) {
				navigate("/error", {
					state: {
						statusCode: e.statusCode, status: e.status, msg: e,
					},
				})
			}
		}

	}

	return (
		<div className={ `${ styles.mainWrapper } ${ styles.mainWrapperNonEmpty } ${ className }` }>
			<div className={ styles.innerWrapper }>
				<div className={ styles.userNameHeader }>
					{ participants }
				</div>
				<div className={ styles.messagesContainer }>
					{ pickedMsg.messages.map(message => (
						<div className={ styles.singleMsgWrapper } key={ uid() }>
							<div
								className={ `${ styles.singleMsg } ${ defineMsgClassName(pickedMsg.user._id, message.sender) }` }>
								{ message.text }
							</div>
						</div>))
					}
					<form className={ styles.newMsgForm } onSubmit={ sendNewMessage }>
						<input className={ styles.sendMsgInput } placeholder="напиши съобщение..." name="newMsg"/>
						<button className={ styles.sendMsgButton }>изпрати</button>
					</form>
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