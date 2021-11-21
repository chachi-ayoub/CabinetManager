const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require ('../models/user.model');
const keys = require("../../config/keys");

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const email = req.body.email.toLowerCase();
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    const accessLvl = req.body.accessLvl;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const image = req.body.image;
    const story = req.body.story;
    const note = req.body.note;
    const statistics = [];
    const specialty = req.body.specialty;
    const insurance = req.body.insurance;
    const assignedDoctors = [];
    const diseases = req.body.diseases;
    const documents = req.body.documents;
    
    // const alreadyExists = User.findOne({ email }).lean();
    // if (alreadyExists) {
    //     return res
    //             .status(400)
    //             .json({ error: "Email already exists"});
    // }

    const newUser = new User({email, password, accessLvl, name, address, phone, image, story, note, statistics, specialty, insurance, assignedDoctors, diseases, documents});
    const userSaved = newUser.save()
        .then(() => {
            if (userSaved) {

                const payload = {
                    id: newUser._id,
                    name: newUser.name,
                    image: newUser.image,
                    accessLvl: newUser.accessLvl
                };
        
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 31556926},
                    (err, token) => {
                        res.cookie('token', token, {
                            httpOnly:true
                        });
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: payload
                        });
                        return res;
                    }
                ); 

            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register-multiple').post((req, res) => {
    req.body.map(item => {
        const email = item.email.toLowerCase();
        const password = bcrypt.hashSync(item.password, bcrypt.genSaltSync(8), null);
        const accessLvl = item.accessLvl;
        const name = item.name;
        const address = item.address;
        const phone = item.phone;
        const image = item.image;
        const story = item.story;
        const note = item.note;
        const statistics = item.statistics;
        const specialty = item.specialty;
        const insurance = item.insurance;
        const assignedDoctors_id = item.assignedDoctor_id;
        const diseases = item.diseases;
        const documents = item.documents;
        
        // const alreadyExists = User.findOne({ email }).lean();
        // if (alreadyExists) {
        //     return res
        //             .status(400)
        //             .json({ error: "Email already exists"});
        // }

        const newUser = new User({email, password, accessLvl, name, address, phone, image, story, note, statistics, specialty, insurance, assignedDoctors_id, diseases, documents});
        const userSaved = newUser.save()
            .then(() => res.json('Users added successfully !'))
            .catch(err => res.status(400).json('Error: ' + err));
    });
});

router.route('/login').post((req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) { return res.status(404).json({ error: "Creds Incorrect !" }); }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
    
                const payload = {
                    id: user._id,
                    name: user.name,
                    image: user.image,
                    accessLvl: user.accessLvl
                };
    
                
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 31556926},
                    (err, token) => {
                        res.cookie('token', token, {
                            httpOnly:true
                        });
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: payload
                        });
                        return res;
                    }
                ); 
    
            } else {
                return res
                        .status(401)
                        .json({ error: "Creds incorrect !" });
            }
        }).catch(err => res.status(400).json('Error 1: ' + err));
    }).catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('User Updated successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
