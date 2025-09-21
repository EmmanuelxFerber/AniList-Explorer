import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVLtVTOhc-J-9vhUfOdmMPzjELmcPKelo",
  authDomain: "van-life-7cf4f.firebaseapp.com",
  projectId: "van-life-7cf4f",
  storageBucket: "van-life-7cf4f.firebasestorage.app",
  messagingSenderId: "1080251588665",
  appId: "1:1080251588665:web:e98882a5980923aa78ede8",
  measurementId: "G-PV7D03BTY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
