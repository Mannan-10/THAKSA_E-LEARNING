import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "Authorization header missing or invalid."});
        }
        
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default authUser;