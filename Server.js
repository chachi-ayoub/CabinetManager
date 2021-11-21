const express = require("express");
const compression = require('compression');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const passport = require("passport");
const cookieParser = require("cookie-parser");


const app = express();
const port = process.env.PORT || 5000;

const db = require("./config/keys").mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connection established successfully !"))
.catch(err => console.log(err));



app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(compression());
app.use(passport.initialize());
app.use(cookieParser());
require("./server/passport")(passport);

// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, Authorization");
    next();
  });

const usersRouter = require ('./server/routes/users');
const appointmentsRouter = require ('./server/routes/appointments');
const standby_roomsRouter = require ('./server/routes/standby_rooms');
const reviewsRouter = require ('./server/routes/reviews');
const ressourcesRouter = require ('./server/routes/ressources');

app.use('/server/appointments', appointmentsRouter);
app.use('/server/standby_rooms', standby_roomsRouter);
app.use('/server/users', usersRouter);
app.use('/server/reviews', reviewsRouter);
app.use('/server/ressources', ressourcesRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server running on port : ${port}`));

/*-------------------------------------------------------------------------*/ 




