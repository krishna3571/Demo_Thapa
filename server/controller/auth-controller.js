// const User = require('../model/user-model')
// const bcrypt = require('bcrypt');

// const home = async (req, res) => {
//     try {
//         res.send("welcome bjh 213 agin d")

//     } catch (error) {
//         console.log(error)
//     }
// }

// const register = async (req, res) => {
//     try {
//         console.log(req.body)
//         const { username, email, phone, password } = req.body

//         const userExist = await User.findOne({ email: email })

//         if (userExist) {
//             return res.status(400).json({ msg: 'email alredy che' })
//         }

//         // HASH THE PASS

//         // const saltRound = 10
//         // const hash_password = await bcrypt.hash(password, saltRound)

//         const userCreated = await User.create({
//             username,
//             email,
//             phone,
//             // password: hash_password
//             password
//         })

//         res.status(201).json({
//             message: userCreated,
//             token: await userCreated.generetToken(),
//             userId: userCreated._id.toString()
//         })

//     } catch (error) {
//         res.status(500).json("server error")
//     }
// }

// module.exports = { home, register }


const User = require('../model/user-model');
const bcrypt = require('bcrypt');

const home = async (req, res) => {
    try {
        res.send("Welcome again");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Create the user
        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        // Generate token
        const token = userCreated.generateToken();

        res.status(201).json({
            message: userCreated,
            token,
            userId: userCreated._id.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email: email })

        if (!userExist) {
            return res.status(400).json({ msg: "inmvaild compalete" })

        }

        const user = await userExist.comparePasswor(password)

        const token = userExist.generateToken();


        if (user) {
            res.status(200).json({
                message: "login succes",
                token,
                userId: userExist._id.toString()
            });
        }
        else {
            res.status(401).json({ msg: "invalid email or password" })
        }


    } catch (error) {
        res.status(500).json("server login error")
    }
}

module.exports = { home, register, login };
