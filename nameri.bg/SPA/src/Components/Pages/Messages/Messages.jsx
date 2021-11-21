import MessagesComp from "../../Components/Messages/MessagesComp.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import styled from "styled-components"


const PageSection = styled.section`
  height: 90vh;
  width: 100%;
  margin-top: 5%;
`

const Messages = (props) => {
	const messages = [
		{
			id: 0,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'ПРАЗНО САОБШТЕНИЕ' },
			],
			sender: { fullName: 'Сийка' },
		},
		{
			id: 1,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'пълно съобщение' },
			],
			sender: { fullName: 'Пешо Тъмното' },
		},
		{
			id: 2,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'ПРАЗНО САОБШТЕНИЕ' },
			],
			sender: { fullName: 'Сийка' },
		},
		{
			id: 3,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'пълно съобщение' },
			],
			sender: { fullName: 'Пешо Тъмното' },
		},
		{
			id: 4,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'ПРАЗНО САОБШТЕНИЕ' },
			],
			sender: { fullName: 'Сийка' },
		},
		{
			id: 5,
			messages: [
				{ text: 'ASAM GOSHO' },
				{ text: 'TOKA LESE' },
				{ text: 'AKO NE SE TOKA GADE SUM' },
				{ text: 'пълно съобщение' },
			],
			sender: { fullName: 'Сийка2' },
		},
	]

	return (
		<MainPageLayout>
			<PageSection>
				<MessagesComp {...{ messages }}/>
			</PageSection>
		</MainPageLayout>
	)
}

export default Messages