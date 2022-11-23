import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
	apiKey: "AIzaSyBReQzkIvXuy63hT7ekVibvtIvMRSzX6mo",
	authDomain: "lab5exercise2.firebaseapp.com",
	projectId: "lab5exercise2",
	storageBucket: "lab5exercise2.appspot.com",
	messagingSenderId: "809329612737",
	appId: "1:809329612737:web:20ec0638c7686b23f40140",
	measurementId: "G-MN0Q1Q3WZL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
