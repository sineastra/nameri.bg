import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styled from "styled-components"
import { useContext, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../Contexts/UserContext.jsx"
import styles from "./Messages.module.css"
import MsgBigChat from "../../Components/MsgBigChat/MsgBigChat.jsx"
import MsgConversations from "../../Components/MsgConversations/MsgConversations.jsx"
import useFetch from "../../../hooks/useFetch.jsx"
import Spinner from "../../Components/Spinner/Spinner.jsx"


const PageSection = styled.section`
  width: 100%;
  margin-top: 5%;
`

const Messages = (props) => {
	const [user, _] = useContext(UserContext)
	const { isLoadingData, data } = useFetch(() => userServices.getAllUserMessages(user._id, user))
	const [conversation, pickConversation] = useState(null)

	const changeMsg = _id => {
		const temp = data.conversations.find(x => x._id === _id)

		pickConversation(temp)
	}

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<PageSection>
					<div className={ styles.outerWrapper }>
						<div className={ styles.mainHeader }>
							<h1>Съобщения</h1>
						</div>
						<div className={ styles.mainWrapper }>
							<section className={ styles.bigCont }>
								<MsgBigChat data={ conversation }/>
							</section>
							<section className={ styles.smallCont }>
								<MsgConversations messages={ data.conversations } changeMsg={ changeMsg }/>
							</section>
						</div>
					</div>
				</PageSection>
			</MainPageLayout>

	)
}

export default Messages