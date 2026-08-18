const User = require("../Models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// const signupUser = async (req, res) => {
//     try {
//         const { userName, email, password } = req.body;
//         if (!userName || !email || !password) {
//             return res.status(400).json({ message: "Please fill all the fields" });
//         }
//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({ message: "User with this email already registered" })

//         }
//         // Bcrypt hash password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)



//         const newUser = new User({
//             userName,
//             email,
//             password: hashedPassword
//         })
//         await newUser.save()
//         // Token while signup
//         const token = jwt.sign(
//             { id: newUser._id },
//             process.env.JWT_SECRET || "HussainaslamGoraya1998_SecretKey",
//             { expiresIn: "7d" }
//         )

//         // Yahan 'token: token' add kar dein
//         res.status(201).json({
//             message: "User created successfully!",
//             token: token, // <--- Token yahan add karein
//             user: newUser
//         });
//         // res.status(201).json({ message: "User created successfully!", user: newUser })
//     } catch (error) {
//         res.status(500).json({ error: error.message });

//     }


// }

const signupUser = async (req, res) => {
    try {
        console.log("1. Signup API hit hui, body:", req.body);

        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            console.log("2. Fields missing hain");
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("3. Email pehle se registered hai");
            return res.status(400).json({ message: "User with this email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        console.log("4. New user save ho gaya");

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || "HussainaslamGoraya1998_SecretKey",
            { expiresIn: "7d" }
        );

        console.log("5. Token generate ho gaya, response bhej rahe hain");
        return res.status(201).json({
            message: "User created successfully!",
            token: token,
            user: newUser
        });
    } catch (error) {
        console.log("6. Catch block mein error aaya:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })

        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not valid" })

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {

            return res.status(400).json({ message: "password is not valid" })
        }

        // Token while Login
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "HussainaslamGoraya1998_SecretKey",
            { expiresIn: "7d" }
        )

        // 3. Response mein token wapas bheja
        res.status(200).json({
            message: "User Login successfully",
            token: token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
        });

        // res.status(201).json({ message: "User Login successfully" })
    } catch (error) {

        res.status(500).json({ error: error.message });

    }

}

module.exports = {
    signupUser,
    loginUser
}