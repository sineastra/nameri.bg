import styles from "./TopUsers.module.css"
import UsersList from "../../Components/UsersList/UsersList.jsx"
import useFetch from "../../../hooks/useFetch.jsx"
import userServices from "../../../services/userServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"


const TopUsers = () => {
	const { isLoadingData, data } = useFetch(() => userServices.getTopUsers(20))

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<UsersList users={ data } className={ styles.userList } heading="Топ Потребители"/>
					</div>
				</div>
			</MainPageLayout>
	)
}

export default TopUsers