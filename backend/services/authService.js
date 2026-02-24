import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import genToken from "../utils/token.js";

export const registerService = async(fullName,email,password) =>{
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = genToken(user._id);
    return { user, token };
}

export const loginService = async(email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Invalid email or password');
    }
    const token = genToken(user._id);
    return { user, token };
}
