/* Côté backend, créez un nouveau module dans le fichier modules/checkBody.js.
Créez à l’intérieur de ce module, une fonction checkBody() qui recevra un objet contenant le body renvoyé 
par les formulaires d’inputs et un tableau des champs à tester. 
Si chaque élément de celui-ci existe et que le nombre d’éléments est le bon, la fonction renverra true et sinon false.
Intégrez ce module dans les 2 routes POST /signup et /signin afin de faciliter la vérification des données reçues.*/ 

function checkBody(body, fields) {
	for (let field of fields) {
		if (!body[field] || String(body[field]).trim() === '') {
			return false;
		}
	}
	return true;
}
module.exports = { checkBody };