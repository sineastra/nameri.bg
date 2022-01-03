import styles from "./TopUsers.module.css"
import useFetch from "../../../hooks/useFetch.jsx"
import userServices from "../../../services/userServices.js"
import Spinner from "../../Components/Spinner/Spinner.jsx"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import UserCard from "../../Components/UserCard/UserCard.jsx"


const TopUsers = () => {
	const { isLoadingData, data } = useFetch(() => userServices.getTopUsers(20))

	return (
		isLoadingData
			? <Spinner/>
			: <MainPageLayout>
				<div className={ styles.mainWrapper }>
					<div className={ styles.innerWrapper }>
						<h1 className={ styles.usersHeader }>Топ Потребители</h1>
						{ data.map(x => (
							<UserCard key={ x._id } user={ x } className={ styles.userCard } headerClassName={styles.userCardNameHeader}/>
						)) }
					</div>
				</div>
			</MainPageLayout>

	)
}

export default TopUsers