const router = require('express').Router();
let Appointment = require ('../models/appointment.model');


router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Appointment.findById(req.params.id)
        .then(Appointment => res.json(Appointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newAppointment = new Appointment(req.body);
    newAppointment.save()
        .then(() => res.json('Appointment added successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment deleted successfully !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Appointment.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Appointment Updated successfully !'))
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