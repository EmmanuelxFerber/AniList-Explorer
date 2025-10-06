import "./SignInPage.css";
import React from "react";
import { Navigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { addUserData } from "../../Firebase/firebase";
import Popup from "../UI elements/Popup/Popup";

export default function SignInPage() {
  const [error, setError] = React.useState(null);
  const [finished, setFinished] = React.useState(false);

  async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const dateRegistered = new Date().toLocaleDateString();
    const userName = formData.get("username");
    const profilePicNr = Math.floor(Math.random() * 8 + 1);
    const info = { dateRegistered, userName, profilePicNr };

    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addUserData(user.uid, info);

      setFinished(true);
      setTimeout(() => {
        setError(null);
        setFinished(false);
      }, 2000);
    } catch (error) {
      setError(error);
      setFinished(true);
      console.log("there has been an error: ", error);

      setTimeout(() => {
        setError(null);
        setFinished(false);
      }, 2000);
    }
  }

  let popupState;
  if (finished) {
    if (error) {
      popupState = <Popup type="error" body={error.code} />;
    } else {
      popupState = <Popup type="success" body="Sign in successful" />;
    }
  } else popupState = null;

  return (
    <section className="sign-in-section">
      {popupState}
      <form className="sign-in-form" action={signIn}>
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>register!</button>
      </form>
    </section>
  );
}
