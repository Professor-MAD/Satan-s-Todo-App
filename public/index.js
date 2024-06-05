import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVqJ7HttoIDV7Jdd-yRaZ-c3R5nSGIK6E",
//   authDomain: "satanic-agenda.firebaseapp.com",
//   projectId: "satanic-agenda",
//   storageBucket: "satanic-agenda.appspot.com",
//   messagingSenderId: "1056746325497",
//   appId: "1:1056746325497:web:fecd3c5309feacedfb2928",
//   measurementId: "G-PMJJ2QQKJE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals();
