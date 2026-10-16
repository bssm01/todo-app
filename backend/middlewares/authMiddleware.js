import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const verifyToken = (req,res,next)=>{
  const token =  req.headers.authorization?.split(" ")[1];

   if (!token) {
      return res.status(401).json({ message: "no token" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = payload.id;
        next();
    } catch (error) {
        return res.status(401).json({message: "invalid token"});
    }

}