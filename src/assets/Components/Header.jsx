import logo from "../pictures/logo.png";
import { Link, NavLink, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  function searchAnime(formData) {
    const searchQuery = formData.get("search");

    navigate(`/searchlist?query=${encodeURIComponent(searchQuery)}`);
  }

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
        <NavLink to={"loginpage"}>Login</NavLink>
      </nav>
      <form action={searchAnime}>
        <input type="text" name="search" placeholder="search for anime" />
      </form>
    </header>
  );
}
