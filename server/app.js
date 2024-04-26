const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let categories = [
    {id: 1, description: 'Messages chrétiens' },
    {id: 2, description: 'Espace' },
    {id: 3, description: 'Armurerie' },
    {id: 4, description: "Déco d'intérieur" },
    {id: 5, description: 'Spécial Steampunk' },
    {id: 6, description: 'Nature' },
    {id: 7, description: 'Portraits' },
    {id: 8, description: 'Architecture' },
]

/********************************************************************************************** */
const secretKey = crypto.randomBytes(32).toString('hex');

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'amaryllispittin@gmail.com' && password === 'PaddlE30') {
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.json({ success: true, token });
    } else {
        // Informations de connexion invalides
        res.status(401).json({ success: false, message: 'Adresse email ou mot de passe incorrect.' });
    }
});

// Exemple de route protégée nécessitant une authentification
app.get('/protected-route', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token d\'authentification manquant.' });
    }

    try {
        // Vérification et décryptage du token avec la clé secrète
        const decodedToken = jwt.verify(token, secretKey);
        // L'utilisateur est authentifié
        res.json({ success: true, message: 'Ressource protégée accessible.' });
    } catch (error) {
        // Erreur de validation du token
        res.status(401).json({ success: false, message: 'Token d\'authentification invalide.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});
/********************************************************************************************** */

/*app.get('/categories', (req, res) => {
    const categoryReferences = categories.map(category => `/category/${category.id}`);
    res.json(categoryReferences);
});*/

app.get('/category/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(category => category.id === categoryId);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({error: "catégorie non trouvée"});
    }
});

