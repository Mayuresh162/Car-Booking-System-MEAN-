const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: 'Please enter full name.'
     },
    email: { 
        type: String,
        required: 'Please enter email.',
        unique: true
     },
    password: { 
        type: String,
        required: 'Please enter password.',
        minlength: [4, 'Password must be atleast 4 character long']
     },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    saltSecret: String
});


userSchema.path('email').validate((val) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email');

userSchema.pre('save', function (next) {
    bcrpyt.genSalt(10, (err, salt) => {
        bcrpyt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password) {
    return bcrpyt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

userSchema.methods.generateUserId = function () {
    console.log("Getting userID");
    let user_id = "cust_"+crypto.randomBytes(7).toString('hex');
    console.log(user_id);
    // let checkUserId = User.find({ userId:user_id });
    // console.log(checkUserId);
    // if(checkUserId.length>0){
    //     return generateUserId();
    // }
    // else 
    return user_id;
}

mongoose.model('User', userSchema);
