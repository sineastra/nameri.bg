import styles from "./TextModal.module.css"
import { useEffect, useState } from "react"


const TextModal = ({
	                   backdropClassName,
	                   wrapperClassName,
	                   header,
	                   placeholder,
	                   subHeader,
	                   onSubmit,
	                   visibleState,
	                   closeModal,
                   }) => {
	const [msg, setMsg] = useState('')

	const updateMsg = (e) =>
		setMsg(e.target.value)

	useEffect(() => {
		if (visibleState === false) {
			setMsg('')
		}
	}, [visibleState])

	return (
		<div className={ `${ styles.backdrop } ${ visibleState ? backdropClassName : styles.hiddenModal }` }>
			<div className={ `${ styles.wrapper } ${ wrapperClassName }` }>
				<h1 className={ styles.header }>{ header }</h1>
				<span className={ styles.closeBtn } onClick={ closeModal }>X</span>
				<h3 className={ styles.smallHeader }>{ subHeader }</h3>
				<form className={ styles.textAreaWrapper } onSubmit={ onSubmit }>
					<textarea
						name="message"
						placeholder={ placeholder }
						className={ styles.textArea }
						value={ msg }
						onChange={ updateMsg }
					/>
					<button className={ styles.submitBtn }>Изпрати</button>
				</form>
			</div>
		</div>
	)
}

export default TextModal