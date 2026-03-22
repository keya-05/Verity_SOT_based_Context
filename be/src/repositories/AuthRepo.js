import User from '../models/User.js';

export const findUserByCredentials = async (username, password) => {
    // MongoDB findOne returns the full document including the 'role'
    return await User.findOne({ username, password });
};

export const createUser = async (username, password, email, role , orgCode) => {
    const newUser = new User({
        username,
        password,
        email,
        role: role || 'user',
        orgCode
    });
    const savedUser = await newUser.save();
    return savedUser;
};