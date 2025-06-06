import { User } from "../models/UserSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    //create new user
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });
    await newUser.save();

    if (newUser) {
      console.log("User registered successfully:", newUser);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    }

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const loginUser = async(req,res)=>{
const {email,password} = req.body;

  try {

    //email & password are required
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }

    //finding user in database
    const userFound = await User.findOne({email});
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    //comparing password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message:"Invalid password"
        })
    }

    //generating JWT token
    const token = jwt.sign({userId: userFound._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    console.log("User logged in successfully:", userFound);
    
    
}catch(error){
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
}
}
