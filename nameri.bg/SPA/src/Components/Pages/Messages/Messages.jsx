import MessagesComp from "../../Components/Messages/MessagesComp.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../../Contexts/UserContext.jsx"


const PageSection = styled.section`
  height: 90vh;
  width: 100%;
  margin-top: 5%;
`

const Messages = (props) => {
	const [user, _] = useContext(UserContext)
	const [conversations, setConversations] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const { conversations } = await userServices.getAllUserMessages(user._id)

			console.log(conversations)

			setConversations(conversations)
		}

		if (user) {
			fetchData()
		}
	}, [user])

	return (
		conversations
			? <MainPageLayout>
				<PageSection>
					<MessagesComp messages={ conversations }/>
				</PageSection>
			</MainPageLayout>
			: null
	)
}

export default Messages