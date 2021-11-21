const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({

    // All Users ..
    _id: {type: String, default: shortid.generate},
    email: {type: String}, 
    password: {type: String}, 
    accessLvl: {type: String},
    name: {type: String},
    address: {type: String},
    phone: {type: String},
    image: {type: String},
    birthday: {type: Date},
    gender: {type: String},
    story: {type: String},
    note: {type: String},
    statistics: [
        {
            name: {type: String},
            value: {type: Number}
        }
    ],

    // Employees Only !
    specialty: {type: String},

    // Patients Only !
    insurance: {
        service: {type: String},
        code: {type: String}
    },
    assignedDoctors: [
        {
            doctor_id: {type: String}
        }
    ],
    diseases: [
        {
            name: {type: String},
            status: {type: String},
            drugs: [
                {
                    name: {type: String},
                    instructions: {type: String}
                }
            ]
        },
        {
            timestamps: true, 
        }
    ],
    documents: [
        {
            name: {type: String},
            path: {type: String}
        },
        {
            timestamps: true, 
        }
    ],
    
},
{
    timestamps: true,
})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", UserSchema);

module.exports = User;