import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

export const Register = async(req, res) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password){
    return res.json({success: false, message: 'Missing Details'})
  }
  try {
    const existingUser = await UserModel.findOne({email})

    if(existingUser){
      return res.json({success: false, message: 'User already exists!'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({name, email, password: hashedPassword})
    await newUser.save()

  } catch (error) {
    res.json({success: false, message: error})
  }
}