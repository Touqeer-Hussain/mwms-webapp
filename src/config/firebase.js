import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDamduabOIK-WANmrHg2K4PHP3lRmWuJpw",
    authDomain: "to-do-applica.firebaseapp.com",
    databaseURL: "https://to-do-applica.firebaseio.com",
    projectId: "to-do-applica",
    storageBucket: "to-do-applica.appspot.com",
    messagingSenderId: "899302758085",
    appId: "1:899302758085:web:805a80b4556ba7d69142ac"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase;