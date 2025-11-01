var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require('../modules/checkBody');

/* POST /signup : route chargée d’inscrire un utilisateur dans la collection Users.

Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result:   false, error: 'Missing or empty fields' }.
Si l’email est déjà enregistré dans la base de données, renvoyez : { result: false, error: 'User already exists' }.
Sinon, renvoyez : { result: true }.*/

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Vérifie les champs vides ou indéfinis
	if (!checkBody(req.body, ['email', 'password'])) {
		return res.json({ result: false, error: 'Missing or empty fields' });
	}
  User.findOne({
    $or: [{ name: req.body.name }, { email: req.body.email }],
  }).then((data) => {
    if (data === null) {
      // Creates new user
      const newUser = new User({
        name,
        email,
        password,
      });

      // Finally save in database
      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

// vérification signin, user existant ou non

router.post("/signin", (req, res) => {
  const { name, email, password } = req.body;
	if (!checkBody(req.body, ['email', 'password'])) {
		return res.json({ result: false, error: 'Missing or empty fields' });
	}
  User.findOne({ email: req.body.email, password: req.body.password }).then(
    (data) => {
      if (data) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

module.exports = router;
