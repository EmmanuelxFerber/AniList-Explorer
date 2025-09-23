import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAnimeSearch } from "../../Api/api";
import { addFavAnime } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";

import "./SearchList.css";

export default function SearchList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const [animeList, setAnimeList] = useState();
  const { user } = useAuth();

  useEffect(() => {
    async function getData() {
      const data = await getAnimeSearch(query);
      console.log("Search list running");
      setAnimeList(data);
    }
    getData();
  }, []);

  const animeListHTML = animeList ? (
    animeList.map((anime) => {
      const { title, genres, images, synopsis, mal_id } = anime || {};
      const genreString = genres
        ? genres.map((genre) => `${genre.name} `)
        : "no genres";
      return (
        <div key={mal_id} className="anime-container">
          <img className="anime-img" src={images.jpg.image_url} />
          <div className="anime-info">
            <h1 className="anime-img">{title}</h1>
            <p className="anime-genre">{genreString}</p>
            <p className="anime-description">{synopsis}</p>
          </div>

          <button onClick={() => addFavAnime(anime, user)}>
            Add anime to the list
          </button>
        </div>
      );
    })
  ) : (
    <h1>loading...</h1>
  );
  console.log(animeListHTML);

  return <section className="animelist-section">{animeListHTML}</section>;
}
