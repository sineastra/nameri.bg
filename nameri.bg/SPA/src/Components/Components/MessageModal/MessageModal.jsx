import styles from "./MessageModal.module.css"


const MessageModal = ({ user, backdropClassName, wrapperClassName, closeModal, onSubmit }) => {

	return (
		<div className={ `${ styles.backdrop } ${ backdropClassName }` }>
			<div className={ `${ styles.wrapper } ${ wrapperClassName }` }>
				<h1 className={ styles.header }>Напиши съобщение</h1>
				<span className={ styles.closeBtn } onClick={ closeModal }>X</span>
				<h3 className={ styles.smallHeader }>Съобщение до: <span
					className={ styles.userNameSpan }>{ user }</span></h3>
				<form className={ styles.textAreaWrapper } onSubmit={ onSubmit }>
					<textarea name="message" placeholder="Напиши нещо..." className={ styles.textArea }/>
					<button className={ styles.submitBtn }>Изпрати</button>
				</form>
			</div>
		</div>
	)
}

export default MessageModal