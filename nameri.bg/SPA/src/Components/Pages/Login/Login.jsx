import Auth from "../../Components/Auth/Auth.jsx"


const Login = () => {
	const inputsData = [
		{ name: "email", placeholder: "Имейл", type: "text" },
		{ name: "password", placeholder: "Парола", type: "password" },
	]
	const benefitsData = [
		"Трупане на бонус точки",
		"Специални отстъпки",
		"Връзка със специалисти от цялата страна и света",
	]

	return (
		<Auth authType="login"
		      conditionsField={false}
		      btnText="Вход"
		      headerText="Вход"
		      inputsData={inputsData}
		      benefitsHeaderText="ПРОФИЛА В ПЛАТФОРМАТА ДАВА ВЪЗМОЖНОСТ ЗА:"
		      benefitsData={benefitsData}
		/>
	)
}

export default Login