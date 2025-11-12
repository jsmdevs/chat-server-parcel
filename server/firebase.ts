require('dotenv').config();
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.KEY_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://first-proyect-4e1ea-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const rtdb = admin.database();

export { db, rtdb };
