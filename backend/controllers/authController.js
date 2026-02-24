import { loginService, registerService } from "../services/authService.js";

export const registerUser = async (req, res) => {
    try{
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const { user, token } = await registerService(fullName, email, password);
        
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(201).json({ user, token });
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const { user, token } = await loginService(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ user, token });
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}