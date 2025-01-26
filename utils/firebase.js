// firebase.js
const admin = require("firebase-admin")
const serviceAccount = require("./firebase-service-account.json")
require("dotenv").config()

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL // Replace with your Firebase Realtime Database URL
})

const db = admin.database()
module.exports = db
