import styles from "./MsgBigChat.module.css"
import { AiOutlineMail } from "react-icons/ai"
import { IconContext } from "react-icons"


const EmptyMsgs = ({ className = '' }) => {

	return (
		<div className={`${styles.mainWrapper} ${className}`}>
			<div className={`${styles.innerWrapper} ${styles.innerWrapperEmpty}`}>
				<div className={styles.noPostWrapper}>
					<IconContext.Provider value={{ size: '2.5em', color: "darkred" }}>
						<AiOutlineMail/>
						<h2>
							Нямаш съобщения в кутията.
						</h2>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	)
}

const NonEmptyMsgs = ({ data, className = '' }) => {

	return (
		<div className={`${styles.mainWrapper} ${className}`}>
			<div className={styles.innerWrapper}>
				<div className={styles.userNameHeader}>
					{data.sender.fullName}
				</div>
				<div className={styles.messagesContainer}>
					{data.messages.map((x, i) => (
						<div className={styles.singleMsgWrapper}>
							<div className={styles.singleMsg} key={x.time || i}>
								{x.text}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

const MsgBigChat = ({ data, className = '' }) => {
	console.log(data)
	return data ? <NonEmptyMsgs {...{ data, className }}/> : <EmptyMsgs {...{ className }}/>

}

export default MsgBigChat