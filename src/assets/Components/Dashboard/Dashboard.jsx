import { useAuth } from "../../Context/AuthContext";
import {
  getUserData,
  getUserAnimeListNumber,
  setUserFilter,
} from "../../Firebase/firebase";
import { getAllGenres } from "../../utils/api";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import Popup from "../UI elements/Popup/Popup";

export default function Dashboard() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [animeNumber, setAnimeNumber] = useState(null);
  const [genres, setGenres] = useState(null);
  const [genreSearch, setGenreSearch] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filterError, setFilterError] = useState("null");
  const [filterLoad, setFilterLoad] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getUserData(user.uid);
      setUserInfo(data[0]);
      const animeData = await getUserAnimeListNumber(user.uid);
      setAnimeNumber(animeData);
      const genreData = await getAllGenres();
      setGenres(genreData);
    }

    getData();
  }, []);

  useEffect(() => {
    const search = genreSearch.toLowerCase();
    const filtered = genres?.filter((genre) =>
      genre.name.toLowerCase().includes(search)
    );
    setFilteredGenres(filtered);
  }, [genreSearch, genres]);

  //sets up genre filter
  function getGenreFilter(formData) {
    const selectedGenre = formData.get("genre").toLowerCase();

    if (selectedGenre) {
      const selectedGenreObj = genres.filter((genre) => {
        console.log();
        return genre.name.toLowerCase() === selectedGenre;
      })[0];
      return selectedGenreObj.mal_id;
    } else return null;
  }
  //sets up score filter
  async function getScoreFilter(formData) {
    const selectedScore = await formData.get("score").toLowerCase();
    return selectedScore;
  }

  //combines all filters from the form and sends it to the firestore
  async function setFilter(formData) {
    try {
      setFilterError(null);
      const score = await getScoreFilter(formData);
      const genre = getGenreFilter(formData);
      const searchQuery = {
        filterQuery: `?min_score=${score}${genre ? `&genres=${genre}` : ""}`,
      };
      setUserFilter(user.uid, searchQuery);
      setFilterLoad(true);
    } catch (error) {
      setFilterError(error);
      setFilterLoad(true);
    }
  }

  const { userName, dateRegistered } = userInfo ? userInfo : "nothing";

  //sets the pop up based on server response
  let popupType;
  if (filterLoad) {
    if (filterError) {
      popupType = (
        <Popup
          type="error"
          body={"There was a problem with setting up filter"}
        />
      );
    } else {
      popupType = <Popup type="success" body={"Filter set up successfuly"} />;
    }
  } else null;

  return (
    <section className="user-data-section">
      <div className="user-data">
        <h1>Username: {userName}</h1>
        <p>With us since: {dateRegistered}</p>
        <p>You have {animeNumber} anime in your Fav list</p>
      </div>
      <div className="filter-container">
        <p className="filter-title">Featured anime filter</p>
        <form className="filter-form" action={setFilter}>
          <div className="filters">
            <div className="genre-filter">
              <p>Genre</p>
              <input
                onChange={(e) => setGenreSearch(e.target.value)}
                value={genreSearch}
                type="text"
                name="genre"
              />

              <ul className="genre-dropdown">
                {genres ? (
                  filteredGenres?.map((genre) => (
                    <li
                      key={genre.mal_id}
                      onClick={() => setGenreSearch(genre.name)}
                    >
                      {genre.name}
                    </li>
                  ))
                ) : (
                  <p>loading...</p>
                )}
              </ul>
            </div>
            <div className="score-filter">
              <p>score</p>
              <select name="score" id="score">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          <button className="filter-btn">Set Filter</button>
          {popupType}
        </form>
      </div>
    </section>
  );
}
