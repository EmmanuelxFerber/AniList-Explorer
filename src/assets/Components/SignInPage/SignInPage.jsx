import "./SignInPage.css";
import React from "react";
import { Navigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { addUserData } from "../../Firebase/firebase";

export default function SignInPage() {
  const [error, setError] = React.useState(null);

  async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const dateRegistered = new Date().toLocaleDateString();
    const userName = formData.get("username");
    const info = { dateRegistered, userName };

    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addUserData(user.uid, info);
      return <Navigate to="/login" replace />;
    } catch (error) {
      setError(error);
      console.log("there has been an error: ", error);
    }
  }

  return (
    <section className="sign-in-section">
      {error ? <h1>{error.code}</h1> : null}
      <form action={signIn}>
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>register!</button>
      </form>
    </section>
  );
}
