import firebase from 'firebase';
var firebaseConfig = {
    /*apiKey: "AIzaSyDTsWO_9_DRj1tRnAw71pYJAKjEa0OYU_g",
    authDomain: "vms-1-e8561.firebaseapp.com",
    databaseURL: "https://vms-1-e8561.firebaseio.com",
    projectId: "vms-1-e8561",
    storageBucket: "",
    messagingSenderId: "1082966901860",
    appId: "1:1082966901860:web:2ab7b77d249f8ab1"*/
    apiKey: "AIzaSyB8anHPrz7BCAGTyfeY6dbrYbu0a6CI5aU",
    authDomain: "bike-c318f.firebaseapp.com",
    databaseURL: "https://bike-c318f.firebaseio.com",
    projectId: "bike-c318f",
    storageBucket: "",
    messagingSenderId: "626092705153",
    appId: "1:626092705153:web:8e420ac966aa4b2d"
}

const FireConf = firebase.initializeApp(firebaseConfig);
export default FireConf;