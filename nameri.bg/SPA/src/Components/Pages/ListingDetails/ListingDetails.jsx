import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import ServiceDetailsBig from "../../Components/ServiceDetailsBig/ServiceDetailsBig.jsx"


const ListingDetails = (props) => {

	const service = {
		details: `НМ ФРЕШ СТИЛ" предлага:
ВиК услуги:

- изграждане на ВиК инсталации
- реконструкция на съществуващи ВиК инсталации
- инсталация на пералня/миялна машина
- подмяна на смесители, душ системи
- подмна на спирателни кранове и водомери
- инсталация и монтаж на бойлер
 
Монтажни дейности:
- тоалетна чиния
- моноблок
- биде
- мивка
- параван
- аксесоари  
`,
	}

	return (
		<MainPageLayout>
			<ServiceDetailsBig service={ service }/>
		</MainPageLayout>
	)
}

export default ListingDetails