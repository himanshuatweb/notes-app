import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import UserModel from "../model/userModel.js";

// Route - GET (login user or singin user ) Existing User
const signIn = async (req,res) =>{
    console.log(`signin controller runs`);
    const {email, password} = req.body;
    try {
        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
          console.log('User does not exists.');
          return res.status(404).json({ message: 'User does not exists.' });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword) {
            console.log('Invalid Credentials');
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { email: checkUser.email, id: checkUser._id },
            'SECRET_PASSWORD',
            { expiresIn: '5m' }
        );

        res.status(200).json({ result: checkUser, token });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in sigin user.',
            message: error.message,
          });
    }
}

// Route - POST (create user) New User;
const signUp = async(req,res) =>{
    console.log(`signup controller runs`);
    const {name, email, password} = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(user){
            return res.status(200).json({msg:"User already exits"})
        }

       const hashPassword = await bcrypt.hash(password,2);
       const result = await UserModel.create({
         name,
         email,
         password:hashPassword
       });

       const token = jwt.sign(
        {email: result.email, id:result._id },
        "SECRET_PASSWORD",
        {expiresIn:'5m'}
       );

        console.log(result);
        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in creating / signUp user.',
            message: error.message,
          });
    }
}

export { signIn, signUp };

