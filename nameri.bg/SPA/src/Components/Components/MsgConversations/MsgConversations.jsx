import styles from "./MsgConversations.module.css"
import MsgSmallCard from "../MsgSmallCard/MsgSmallCard.jsx"
import { FaSadTear } from "react-icons/fa"
import { IconContext } from "react-icons"


const MsgConversations = ({ messages, changeMsg }) => {
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

export default MsgConversations
