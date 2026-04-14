// const admin = require("firebase-admin");
// const serviceAccount = require("./firebaseServiceAccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const verifyFirebaseToken = async (token) => {
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     return decodedToken.uid; // Use this UID to link with Supabase
//   } catch (error) {
//     throw new Error("Invalid Firebase token");
//   }
// };

// module.exports = { verifyFirebaseToken };