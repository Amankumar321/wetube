import UserModel from "../models/user.js"
import ProfileModel from "../models/profile.js"
import jwt from "jsonwebtoken"

export const signin = async (req, res) => {
  try {
        const { username, password } = req.body
        if (username.length < 3 || password.length < 3) {
          return res.status(500).json({ message: "Something went wrong" })
        }
        const oldUser = await UserModel.findOne({ username: username })
    
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })
    
        const isPasswordCorrect = await password == oldUser.password
    
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" })

        const token = jwt.sign({ userid: oldUser._id, username: oldUser.username }, 'test', { expiresIn: '12h' })
        return res.status(200).json({ token: token })
      } 
      catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
      }
}

export const signup = async (req, res) => {
  
  try {
        const { username, password } = req.body
        if (username.length < 3 || password.length < 3) {
          return res.status(500).json({ message: "Something went wrong" })
        }

        const oldUser = await UserModel.findOne({ username: username });
    
        if (oldUser) return res.status(403).json({ message: "User already exists" });
    
        const result = await UserModel.create({ username: username, password: password });
        await ProfileModel.create({ user_id: result._id, username: result.username })
        

        const token = jwt.sign({ userid: result._id, username: username }, 'test', { expiresIn: '12h' })
        return res.status(200).json({ token: token })
      } 
      catch (error) {
        return res.status(500).json({ message: "Something went wrong" });  
      }
}
