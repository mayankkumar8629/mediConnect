import jwt from 'jsonwebtoken';
import {configDotenv} from "dotenv";
configDotenv({path:"../../.env"});

export const authenticateToken =async (req, res, next) => {
  // Extract token from the Authorization header (format: "Bearer <token>")
 
  const authHeader = await req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // Attach the decoded token (user info) to req.user
    req.user = user;
    console.log("successfull");
    next();
  });
};

export const authorizeRoles = (...allowedRoles)=>{
  return (req,res,next)=>{
    if(!req.user){
      return res.status(401).json({message:"Unauthorized"});
    }
    
    if(!allowedRoles.includes(req.user.role)){
      return res.status(403).json({message:"Access denied"});
    }
   
    console.log("this is working");
    next();
  }
};


