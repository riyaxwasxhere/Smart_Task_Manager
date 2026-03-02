import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided" })
  }

  try {
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken || !decodedToken.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token" })
    }

    req.userId = decodedToken.userId;
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token" })
  }
}

export default authMiddleware