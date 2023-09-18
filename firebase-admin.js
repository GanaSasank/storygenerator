// firebase-admin.js

const admin = require("firebase-admin");
const serviceAccount = require("./cred.json"); // Replace with your own service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://storywebsite-b2977-default-rtdb.firebaseio.com/", // Replace with your Firebase DB URL
});

module.exports = admin;
