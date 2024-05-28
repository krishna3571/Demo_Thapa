// const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');


// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true
//     },
//     phone: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     }
// })

// userSchema.pre('save', async function (next) {

//     // console.log("first", this)

//     const user = this;

//     if (!user.isModified("password")) {
//         next();
//     }

//     try {
//         const saltRound = await bcrypt.genSalt(10)
//         const hash_password = await bcrypt.hash(user.password, saltRound)
//         user.password = hash_password
//     } catch (error) {
//         next(error)
//     }
// })

// userSchema.method.generetToken = async function () {
//     try {
//         return jwt.sign(
//             {
//                 userId: this._id.toString(),
//                 email: this.email,
//                 isAdmin: this.isAdmin,
//             },
//             process.env.JWT_SECRET_KEY,
//             {
//                 expiresIn: "30d"
//             }
//         );

//     } catch (error) {
//         console.error(error)
//     }
// }

// const User = new mongoose.model("User", userSchema)

// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// compare password

userSchema.methods.comparePasswor = async function (password) {
    return bcrypt.compare(password, this.password)
}

// Method to generate a JWT token
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
