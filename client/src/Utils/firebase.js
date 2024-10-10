import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAs7nSa-VR453aoNQv_ZRjK9O-5sSScRLE",
  authDomain: "cloud0924.firebaseapp.com",
  databaseURL: "https://cloud0924-default-rtdb.firebaseio.com",
  projectId: "cloud0924",
  storageBucket: "cloud0924.appspot.com",
  messagingSenderId: "587763029124",
  appId: "1:587763029124:web:86ead4af552af86b6f9ed1",
  measurementId: "G-V4MBMCYVDR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
