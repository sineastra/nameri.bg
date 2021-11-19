import styles from "./ProfileEdit.module.css"
import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import CustomInputFile from "../../Components/CustomInputFile/CustomInputFile.jsx"


const dataFromContext = {
	isOwn: false,
	premiumPlan: 2,
	user: {
		fullName: 'Pesho Kalibrata',
		votedUsers: 1500,
		rating: 1.1,
		ratingTitle: 'Not Cool Guy',
		about: 'I am not cool guy. I am hot guy.',
		phone: '111',
		email: 'asd@asd.asd',
		address: 'Pesho str',
		website: 'abv.bg',
		skills: ['peshizum', 'ciklizum', 'traktorizum'],
		diplomasAndCertifs: [{
			heading: 'Peshov Certificat',
			institution: 'Peshova Instituciq',
			from: '11.11.1111',
			to: '12.11.1111',
		}, {
			heading: 'Peshov Certificat',
			institution: 'Peshova Instituciq',
			from: '11.11.1111',
			to: '12.11.1111',
		}],
	},
}

const Certificate = ({ data }) => {

	return (
		<div className={ styles.singleCertifWrapper }>
			<div className={ styles.certifRow }>
				<div>Заглавие:</div>
				<div className={ styles.bolder }>{ data.heading }</div>
			</div>
			<div className={ styles.certifRow }>
				<div>Институция:</div>
				<div className={ styles.bolder }>{ data.institution }</div>
			</div>
			<div className={ styles.certifRow }>
				<div>От:</div>
				<div className={ styles.bolder }>{ data.from }</div>
			</div>
			<div className={ styles.certifRow }>
				<div>До:</div>
				<div className={ styles.bolder }>{ data.to }</div>
			</div>
		</div>
	)
}

const ProfileEdit = () => {

	return (
		<MainPageLayout>

			<section className={ styles.mainWrapper }>
				<section className={ styles.smallerWrapper20 }>
					<h1>РЕДАКТИРАЙ ПРОФИЛ</h1>
					<article className={ styles.details }>
						<p>С добавянето на повече информация за теб, даваш възможност на товите потенциални клиенти да
							те
							опознаят
							по-добре. В полето за "Повече информация за вас" разкажи за твоя професионален опит, а
							по-долу в
							"ДИПЛОМИ И СЕРТИФИКАТИ" можеш да добавиш квалификациите, които имаш. Профилната снимка
							говори за
							твоята
							идентичност. Можеш да добавиш нова или да редактираш стара от полето "KAЧИ ПРОФИЛНА
							СНИМКА". </p>

						<p>Разбира се контактите са най-важни. Така ще съкратиш връзката между теб и бъдещите си
							клиенти.</p>
					</article>
					<section className={ styles.smallerWrapper }>
						<input type="text" placeholder="Име и фамилия"/>
						<div className={ styles.halfInputWrapper }>
							<input type="text" placeholder="Телефон" className={ styles.halfInput }/>
							<input type="text" placeholder="Уебсайт" className={ styles.halfInput }/>
							<input type="text" placeholder="Имейл" className={ styles.halfInput }/>
							<input type="text" placeholder="Адрес" className={ styles.halfInput }/>
						</div>
						<input type="text" placeholder="Адрес"/>
						<textarea name="about" id="aboutTextarea" placeholder="За мен..."
						          className={ styles.textArea }/>
						<CustomInputFile className={ styles.customInput }/>
						<div>
							<h1>Промени парола</h1>
							<div className={ styles.halfInputWrapper }>
								<input type="password" className={ styles.halfInput } placeholder="Нова Парола"/>
								<input type="password" className={ styles.halfInput }
								       placeholder="Повтори Нова Парола"/>
							</div>
						</div>
						<div>
							<h1>Дипломи и сертификати</h1>
							<div className={ styles.certifWrapper }>
								{ dataFromContext.user.diplomasAndCertifs.map(x => <Certificate data={ x }/>) }
							</div>
						</div>
					</section>
				</section>
				<div className={ styles.submitBtnWrapper }>
					<button className={ styles.submitBtn }>ЗАПАЗИ</button>
				</div>
			</section>
		</MainPageLayout>
	)
}

export default ProfileEdit
