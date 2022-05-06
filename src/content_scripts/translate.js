progressiveImmersion.translate = function (elem, dictionary, origin, target) {

	if (origin === undefined || target === undefined || dictionary === undefined || dictionary[origin] === undefined || typeof dictionary[origin][target] !== "object") {
		return;
	}

	const dictionaryPage = dictionary[origin][target];

	for (let word in dictionaryPage) {
		const regex = new RegExp(`\\b${word}\\b`, "gu");
		elem.textContent = elem.textContent.replaceAll(regex, dictionaryPage[word]);
	}

}