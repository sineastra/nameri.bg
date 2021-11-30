import styles from "./MessagesComp.module.css"
import MsgBigChat from "../MsgBigChat/MsgBigChat.jsx"
import MsgSmallCard from "../MsgSmallCard/MsgSmallCard.jsx"
import { useState } from "react"


const MessagesSide = ({ messages, changeMsg }) => {
	return (
		<aside>
			{ messages.map(msg => (
				<MsgSmallCard { ...{ key: msg._id, messageData: msg, changeMsg } } />
			)) }
		</aside>
	)
}

const MessagesComp = ({ messages }) => {
	const [pickedMsg, pickMsg] = useState(messages[0])

	const changeMsg = id => {
		pickMsg(messages[id])
	}

	return (
		<section className={ styles.outerWrapper }>
			<div className={ styles.mainHeader }>
				<h1>Съобщения</h1>
			</div>
			<section className={ styles.mainWrapper }>
				<section className={ styles.bigCont }>
					<MsgBigChat data={ pickedMsg }/>
				</section>
				<section className={ styles.smallCont }>
					<MessagesSide { ...{ messages, changeMsg } } />
				</section>
			</section>
		</section>
	)
}

export default MessagesComp
