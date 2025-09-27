import logo from "../pictures/logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { auth } from "../Firebase/firebase";
import { useAuth } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import SearchBar from "./UI elements/SearchBar";

export default function Header() {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  function searchAnime(formData) {
    const searchQuery = formData.get("search");

    navigate(`/searchlist?query=${encodeURIComponent(searchQuery)}`);
  }

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header>
      <NavLink to={"/"}>
        <img
          className="header-logo"
          src={logo}
          alt="open book under starry skies"
        />
      </NavLink>

      <nav>
        <NavLink to={"favpage"}>My List</NavLink>
        <NavLink to={"dashboard"}>Profile</NavLink>
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <NavLink to={"loginpage"}>Login</NavLink>
        )}
      </nav>
      <form action={searchAnime}>
        <SearchBar />
      </form>
    </header>
  );
}
