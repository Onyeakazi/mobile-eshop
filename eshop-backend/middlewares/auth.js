const { verifyFirebaseToken } = require("../firebaseAdmin.js");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const uid = await verifyFirebaseToken(token);
    req.uid = uid; // attach UID for use in controllers
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };