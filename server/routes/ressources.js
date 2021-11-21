const router = require('express').Router();
let Ressource = require ('../models/ressource.model');

// const expressJWT = require('express-jwt');
// const secretKey = require("../../config/keys").secretOrKey;

// const checkJWT = expressJWT({
//     secret: secretKey,
//     algorithms: ['HS256'],
//     getToken: req => req.cookies.token
// });

// const checkAccessLvl = (req, res, next) => {
//     if (req.user.accessLvl !== "Admin" || req.user.accessLvl !== "Assistant") {
//         return res
//             .status(401)
//             .json({ message: 'Insufficient permissions !'})
//     }
//     next(); 
// }

router.route('/').get((req, res) => {
    Ressource.find()
        .then(ressources => res.json(ressources))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Ressource.findById(req.params.id)
        .then(ressource => res.json(ressource))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newRessource = new Ressource(req.body);
    newRessource.save()
        .then(() => res.json('Ressource added successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Ressource.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ressource deleted successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Ressource.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Ressource Updated successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
