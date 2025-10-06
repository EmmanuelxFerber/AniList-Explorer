import logo from "../pictures/logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { auth } from "../Firebase/firebase";
import { useAuth } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import SearchBar from "./UI elements/SearchBar";
import { useState, useEffect } from "react";
import { getUserData } from "../Firebase/firebase";

export default function Header() {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getData() {
      if (user) {
        const data = await getUserData(user.uid);
        setUserInfo(data[0]);
      }
    }

    getData();
  }, [user]);

  function searchAnime(formData) {
    const searchQuery = formData.get("search");

    navigate(`/searchlist?query=${encodeURIComponent(searchQuery)}`);
  }

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const { userName, profilePicNr } = userInfo ? userInfo : "nothing";

  return (
    <header>
      <NavLink
        to={"/"}
        onClick={() => {
          if (window.location.pathname === "/") {
            window.location.reload();
          }
        }}
      >
        <img
          className="header-logo"
          src={logo}
          alt="open book under starry skies"
        />
      </NavLink>
      {userInfo ? (
        <div className="welcome-message">
          <img
            className="profile-picture"
            src={`/profile${profilePicNr}.png`}
            alt="anime-profile-picture"
          />
          <p>Hello {userName}</p>
        </div>
      ) : null}
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
