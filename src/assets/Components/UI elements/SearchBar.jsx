import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <button className="searchbar-btn">
        <FaSearch />
      </button>
      <input
        className="searchbar-input"
        type="text"
        name="search"
        placeholder="search for anime"
      />
    </div>
  );
}
