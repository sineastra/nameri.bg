import styles from "./MessagesComp.module.css"
import MsgBigChat from "../MsgBigChat/MsgBigChat.jsx"
import MsgSmallCard from "../MsgSmallCard/MsgSmallCard.jsx"
import { useState } from "react"
import { FaSadTear } from "react-icons/fa"
import { IconContext } from "react-icons"


const MessagesSide = ({ messages, changeMsg }) => {
	const messagesExist = messages.length > 0

	return (
		<aside className={ styles.asideChat }>
			<div className={ styles.asideInnerChat }>
				{ messagesExist
					? <>
						<div className={ styles.innerBoxText }>Входяща кутия</div>
						{ messages.map(msg =>
							<MsgSmallCard key={ msg._id } messageData={ msg }
							              changeMsg={ changeMsg }/>) }
					</>
					: <div className={ styles.noMessagesDiv }>
						Нямаш съобщения в кутията
						<IconContext.Provider value={ { className: styles.sadIcon } }>
							<FaSadTear/>
						</IconContext.Provider>
					</div> }
			</div>
		</aside>
	)
}

const MessagesComp = ({ messages }) => {
	const [pickedMsg, pickMsg] = useState(null)

	const changeMsg = _id => {
		const temp = messages.find(x => x._id === _id)

		pickMsg(temp)
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
