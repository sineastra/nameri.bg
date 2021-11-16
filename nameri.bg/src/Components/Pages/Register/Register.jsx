import Auth from "../../Components/Auth/Auth.jsx"


const Register = () => {
	const inputsData = [
		{ name: "email", placeholder: "Имейл", type: "text" },
		{ name: "text", placeholder: "Име и Фамилия", type: "text" },
		{ name: "password", placeholder: "Парола", type: "password" },
		{ name: "rePass", placeholder: "Повтори паролата", type: "password" },
	]
	const benefitsData = [
		"Връзка със специалистите в платформата",
		"Публикуване на една безплатна обява",
		"Развитие на твоя бизнес",
	]

	return (
		<Auth authType="register"
		      conditionsField={true}
		      btnText="Регистрация"
		      headerText="Регистрация"
		      inputsData={inputsData}
		      benefitsHeaderText="С ПРОФИЛ В ПЛАТФОРМАТА ПОЛУЧАВАШ ВЪЗМОЖНОСТ ЗА:"
		      benefitsData={benefitsData}
		/>
	)
}

export default Register