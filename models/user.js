const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'age is required'],
        validate: {
            validator: function (value) {
                return String(value).length <= 3;
            },
            message: 'age must be at most three digits long'
        }
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    }

);
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
        // console.log(token);
    } catch (error) {
        console.log(error);
    }
}

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}

);
const User = mongoose.model('User', UserSchema);
module.exports = User;