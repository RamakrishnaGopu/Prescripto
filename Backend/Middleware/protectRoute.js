import jwt from "jsonwebtoken";
import {User} from "../Model/UserModel.js";

const protectRoute = async (req, res, next) => {
	try {
		const authHeader=req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.json({ message: "Unauthorized - No Token Provided" });
		}
		const token=authHeader.split(" ")[1];
        console.log("token from route",token)

		// verify the token
		const decoded = jwt.verify(token,process.env.JWT_SECRET);

		if (!decoded) {
			return res.json({ message: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.json({ message: "User not found" });
		}

		req.user = user;

		next();

	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.json({ message: "Internal server error" });
	}
};

export default protectRoute;