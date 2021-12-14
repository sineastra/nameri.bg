import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../Contexts/UserContext.jsx"
import styles from "./Messages.module.css"
import MsgBigChat from "../../Components/MsgBigChat/MsgBigChat.jsx"
import MsgConversations from "../../Components/MsgConversations/MsgConversations.jsx"


const PageSection = styled.section`
  width: 100%;
  margin-top: 5%;
`

const Messages = (props) => {
	const [user, _] = useContext(UserContext)
	const [messages, setMessages] = useState([])
	const [pickedMsg, pickMsg] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = await userServices.getAllUserMessages(user._id)

			setMessages(data.conversations)
		}

		if (user) {
			fetchData()
		}
	}, [user])

	const changeMsg = _id => {
		const temp = messages.find(x => x._id === _id)

		pickMsg(temp)
	}

	return (
		user && messages
			? <MainPageLayout>
				<PageSection>
					<div className={ styles.outerWrapper }>
						<div className={ styles.mainHeader }>
							<h1>Съобщения</h1>
						</div>
						<div className={ styles.mainWrapper }>
							<section className={ styles.bigCont }>
								<MsgBigChat data={ pickedMsg }/>
							</section>
							<section className={ styles.smallCont }>
								<MsgConversations { ...{ messages, changeMsg } } />
							</section>
						</div>
					</div>
				</PageSection>
			</MainPageLayout>
			: null
	)
}

export default Messages