import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  // Skip token verification for the login route
  if (req.path === "/api/auth/login") {
    return next();
  }
  if (req.path.startsWith("/uploads")) {
    return next();
  }
  if (req.path === "/api/users/registration") {
    return next();
  }

  // Get token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid or expired token.");
    }
    console.log("Decoded token:", decoded); // Log the decoded token
    req.user = decoded.user; // Attach decoded payload to request object
    next(); // Proceed to the next middleware or route handler
  });
}

export default authenticateToken;
