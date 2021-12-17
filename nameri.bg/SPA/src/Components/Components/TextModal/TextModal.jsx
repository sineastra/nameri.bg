import styles from "./TextModal.module.css"


const TextModal = ({
	                   backdropClassName,
	                   wrapperClassName,
	                   header,
	                   placeholder,
	                   subHeader,
	                   onSubmit,
	                   visibleState,
	                   setVisibleState,
                   }) => {

	return (
		<div className={ `${ styles.backdrop } ${ visibleState ? backdropClassName : styles.hiddenModal }` }>
			<div className={ `${ styles.wrapper } ${ wrapperClassName }` }>
				<h1 className={ styles.header }>{ header }</h1>
				<span className={ styles.closeBtn } onClick={ () => setVisibleState(false) }>X</span>
				<h3 className={ styles.smallHeader }>{ subHeader }</h3>
				<form className={ styles.textAreaWrapper } onSubmit={ onSubmit }>
					<textarea name="message" placeholder={ placeholder } className={ styles.textArea }/>
					<button className={ styles.submitBtn }>Изпрати</button>
				</form>
			</div>
		</div>
	)
}

export default TextModal