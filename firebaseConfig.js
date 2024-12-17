import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDz18wE8JK-oaEmOajjLhA-25J33g6_0ig",
  authDomain: "centro-deportivo-fbd23.firebaseapp.com",
  databaseURL: "https://centro-deportivo-fbd23-default-rtdb.firebaseio.com",
  projectId: "centro-deportivo-fbd23",
  storageBucket: "centro-deportivo-fbd23.firebasestorage.app",
  messagingSenderId: "415970566671",
  appId: "1:415970566671:web:8a9ebc3a0179ed1ebfb97a",
  measurementId: "G-P98ZV4QYCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
