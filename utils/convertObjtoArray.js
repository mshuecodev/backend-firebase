async function convertObjtoArray(data) {
	const list = Object.keys(data).map((key) => ({
		id: key,
		...data[key]
	}))

	return list
}

module.exports = { convertObjtoArray }
