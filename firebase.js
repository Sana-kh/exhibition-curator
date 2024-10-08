// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCDRzDoOmM27O2KuVjNGQJkNjcfB8P-EE",
  authDomain: "exhibition-curator-eb6a1.firebaseapp.com",
  projectId: "exhibition-curator-eb6a1",
  storageBucket: "exhibition-curator-eb6a1.appspot.com",
  messagingSenderId: "174990609187",
  appId: "1:174990609187:web:c8ced32f1eb62ee0909a96",
  measurementId: "G-45EQ2VVK4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
// const signIn = () => {
// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
// }
//   export default signIn;
// export const signIn = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in:", userCredential.user);
//       return userCredential.user;
//     } catch (error) {
//       console.error("Error signing in:", error); // Log the entire error object
  
//       const errorCode = error.code;
//       let customErrorMessage = "An error occurred during sign-in."; // Default message
  
//       // Customize error messages based on error code
//       if (errorCode === 'auth/user-not-found') {
//         customErrorMessage = "You do not have an account. Please sign up.";
//       } else if (errorCode === 'auth/wrong-password') {
//         customErrorMessage = "Incorrect password. Please try again.";
//       } else if (errorCode === 'auth/invalid-email') {
//         customErrorMessage = "The email address is not valid.";
//       } else if (errorCode === 'auth/invalid-credential') {
//         customErrorMessage = "Invalid credentials provided.";
//       }
  
//       throw new Error(customErrorMessage); // Throw the customized error
//     }
//   };
  
export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Full error object:", error); // Log the entire error object
  
      const errorCode = error.code;
      console.error("Error code:", errorCode);
      let customErrorMessage;
        switch (errorCode) {
        case 'auth/user-not-found':
          customErrorMessage = "You do not have an account. Please sign up.";
          break;
        case 'auth/wrong-password':
          customErrorMessage = "Incorrect password. Please try again.";
          break;
        case 'auth/invalid-email':
          customErrorMessage = "The email address is not valid.";
          break;
        // case 'auth/invalid-credential':
        //   customErrorMessage = "Invalid credentials provided.";
        //   break;
        default:
          customErrorMessage = "An error occurred during sign-in.";
      }
      console.error("Custom error message:", customErrorMessage);
      throw new Error(customErrorMessage); // Throw the customized error
    }
  };
  export const createUser = async (email, password) => {
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
  
      return userCredential.user; 
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Throw error to be caught in SignUp component
    }
  };
