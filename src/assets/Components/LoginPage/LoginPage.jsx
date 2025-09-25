import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  async function login(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError(null);
      setUser(userCredential.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        setError("Invalid password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account with this email.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  }

  return (
    <section className="login-section">
      {error && <p>{error}</p>}
      <form action={login}>
        <input
          className="login-email"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="login-password"
          type="password"
          name="password"
          placeholder="password"
        />
        <button>login</button>
      </form>
      <p>Dont have an account?</p>
      <Link to="/signinpage" state={{ from: location }} replace>
        sign in!
      </Link>
    </section>
  );
}
