const uid = () => {
	const fourCharsHexaID = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	//return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
	return fourCharsHexaID() + fourCharsHexaID() + '-' + fourCharsHexaID() + '-' + fourCharsHexaID() + '-' + fourCharsHexaID() + '-' + fourCharsHexaID() + fourCharsHexaID() + fourCharsHexaID()
}

export default uid