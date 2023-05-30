const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.hello = (req, res) => {
    res.send("Hello from user controller");
}
exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            status:'Success',
            users
        })
    }
    catch(error){
        res.json({
            status:'Fail',
            error
        })
    }
}
exports.Signup = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const user = new User({
            email: email,
            password: password,
            name: name,
            age: age,
        });
        console.log(user);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: `User with this email:${existingUser.email} already exists as ${existingUser
                    .name}`
            });
        }
        const token = await user.generateAuthToken(); //model me jakar generateAuthToken function ko call kia
        //cookie me token ko save kia
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true,
            secure: true
        });
        console.log(user);
        await user.save();
        res.status(201).send({ message: "User Created Successfully", success: true });


    }
    catch (error) {
        res.json({
            status: 'Fail',
            error
        })
    }
};
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await User.findOne({
            email: email
        });
        if (users.email === email && bcrypt.compareSync(password, users.password)) {
            const token = await users.generateAuthToken(); //model me jakar generateAuthToken function ko call kia
            //cookie me token ko save kia
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true,
                secure: true
            });
            await users.save();
            res.status(201).send({ message: `Successfully Logged In as ${users.name}`, success: true });
            console.log(`Signed as ${users.name}`);
            console.log(`Successfully Logged In as ${users.name}`)
        }
        else {
            res.send('error');
        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};
exports.UpdateProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, age } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Updating the user's name and age
        user.name = name;
        user.age = age;
        await user.save();
        return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};