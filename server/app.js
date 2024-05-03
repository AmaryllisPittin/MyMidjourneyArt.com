const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
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

let images = [
    { categoryId: 1, url: '../img/Moise.webp' },
    { categoryId: 2, url: '../img/Helice.webp' },
    { categoryId: 3, url: '../img/CouteauCerf.webp' },
    { categoryId: 4, url: '../img/deco.webp' },
    { categoryId: 5, url: '../img/steampunk.webp' },
    { categoryId: 6, url: '../img/nature.webp' },
    { categoryId: 7, url: '../img/portrait.webp' },
    { categoryId: 8, url: '../img/architecture.webp' },
];


/********************************************************************************************** */
const secretKey = crypto.randomBytes(32).toString('hex');

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'amaryllispittin@gmail.com' && password === 'PaddlE30') {
        let token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Adresse email ou mot de passe incorrect.' });
    }
});

app.get('/protected-route', (req, res) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token d\'authentification manquant.' });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        res.json({ success: true, message: 'Ressource protégée accessible.' });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token d\'authentification invalide.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});
/********************************************************************************************** */

app.get('/category/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    let category = categories.find(category => category.id === categoryId);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({error: "catégorie non trouvée"});
    }
});

app.get('/category/:id/images', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const categoryImages = images.filter(image => image.categoryId === categoryId);

    if (categoryImages.length > 0) {
        res.json(categoryImages);
    } else {
        res.status(404).json({ error: "Aucune image trouvée pour cette catégorie" });
    }
});

