import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "./config/firebase-config";
import "./App.css";
import Todos from "./components/Todos";

// Initialize Firebase with the provided configuration
firebase.initializeApp(firebaseConfig);

function App() {
  // State variables
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    // Check if the user's authentication state changes
    firebase.auth().onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        // If the user is authenticated
        setAuth(true);
        // Store the authentication state in local storage
        window.localStorage.setItem("auth", "true");
        // Get the user's ID token
        userCredentials.getIdToken().then((token) => {
          setToken(token);
        });
      }
      console.log(userCredentials);
    });
  }, []);

  // Function to handle Google login
  const loginWithGoogle = async () => {
    try {
      // Sign in with Google using Firebase authentication
      const userCredentials = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (userCredentials) {
        // If the login is successful
        setAuth(true);
        // Store the authentication state in local storage
        window.localStorage.setItem("auth", "true");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div className="App">
      {auth ? (
        // Render Todos component if user is authenticated
        <Todos token={token} />
      ) : (
        // Render Google login button if user is not authenticated
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
