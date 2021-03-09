const firebase = require("firebase/app")
require("firebase/firestore")

// test pull

const firebaseConfig = {
apiKey: "AIzaSyCRxscHjgDfSbycKEKheCFiBHeSnFKohbI",
authDomain: "kiei-final-78a58.firebaseapp.com",
projectId: "kiei-final-78a58",
storageBucket: "kiei-final-78a58.appspot.com",
messagingSenderId: "400111388258",
appId: "1:400111388258:web:c465f80560eaed4d31b33b"} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase