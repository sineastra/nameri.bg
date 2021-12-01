import MessagesComp from "../../Components/Messages/MessagesComp.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import userServices from "../../../services/userServices.js"
import UserContext from "../../../Contexts/UserContext.jsx"
import { Navigate } from "react-router-dom"


const PageSection = styled.section`
  height: 90vh;
  width: 100%;
  margin-top: 5%;
`

const Messages = (props) => {
	const [user, _] = useContext(UserContext)
	const [conversations, setConversations] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await userServices.getAllUserMessages(user._id)

			setConversations(data.conversations)
		}

		if (user) {
			fetchData()
		}
	}, [user])

	return (
		user
			? <MainPageLayout>
				<PageSection>
					<MessagesComp messages={ conversations }/>
				</PageSection>
			</MainPageLayout>
			: <Navigate to="/sign-in"/>
	)
}

export default Messages