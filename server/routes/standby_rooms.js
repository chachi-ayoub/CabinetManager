const router = require('express').Router();
let Standby_room = require ('../models/standby_room.model');


router.route('/').get((req, res) => {
    Standby_room.find()
        .then(standby_rooms => res.json(standby_rooms))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Standby_room.findById(req.params.id)
        .then(standby_room => res.json(standby_room))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newStandby_room = new Standby_room(req.body);
    newStandby_room.save()
        .then(() => res.json('Standby_room added successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Standby_room.findByIdAndDelete(req.params.id)
        .then(() => res.json('Standby_room deleted successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Standby_room.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Standby_room Updated successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

/*

app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);

});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});


*/