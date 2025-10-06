import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAnimeSearch } from "../../utils/api";
import {
  addFavAnime,
  getUserAnimeList,
  DeleteAnimeByMal_id,
} from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";

import "./SearchList.css";

export default function SearchList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const [animeList, setAnimeList] = useState();
  const { user } = useAuth();
  const [favAnime, setFavAnime] = useState([]);
  const [datailedanimeIds, setDetailedAnimeIds] = useState([]);

  useEffect(() => {
    async function getData() {
      const searchData = await getAnimeSearch(query);
      setAnimeList(searchData);
      try {
        const userID = user?.uid;
        const data = await getUserAnimeList(userID);
        const animeIds = data.map((anime) => ({
          animeId: anime.mal_id,
        }));
        setFavAnime(animeIds);
      } catch (error) {
        console.log("there was an error: ", error);
      }
    }
    getData();
  }, [query]);

  function displayDetailed(animeId) {
    setDetailedAnimeIds((prev) =>
      prev.includes(animeId)
        ? prev.filter((id) => id !== animeId)
        : [...prev, animeId]
    );
  }

  const animeListHTML =
    animeList && favAnime ? (
      animeList.map((anime) => {
        const { title, genres, images, synopsis, mal_id, url } = anime || {};

        //curates the description string so that it doesnt overflow

        const synopsisShortened = synopsis
          ? synopsis.split(" ").length > 150
            ? synopsis.split(" ").slice(0, 150).join(" ") + "..."
            : synopsis
          : null;
        const genreString = genres
          ? genres.map((genre) => `${genre.name} `)
          : "no genres";

        const isInFavList = favAnime?.some((anime) => anime.animeId === mal_id);

        return (
          <div key={mal_id} className="anime-container">
            <div className="anime-img-container">
              <img className="anime-img" src={images.jpg.image_url} />
            </div>

            <div className="anime-info">
              <a href={url} target="_blank">
                <h1 className="rand-anime-title">{title}</h1>
              </a>
              <p className="anime-genre">{genreString}</p>
              <p
                onClick={() => displayDetailed(mal_id)}
                className={`anime-description ${
                  datailedanimeIds.includes(mal_id) ? "detailed" : ""
                }`}
              >
                {synopsisShortened}
              </p>
            </div>

            {user ? (
              isInFavList ? (
                <button
                  className="rand-anime-btn"
                  onClick={() => {
                    DeleteAnimeByMal_id(user.uid, mal_id);
                    setFavAnime((prev) => {
                      return prev.filter((a) => a.animeId !== mal_id);
                    });
                  }}
                >
                  Remove anime from the list
                </button>
              ) : (
                <button
                  className="rand-anime-btn"
                  onClick={() => {
                    addFavAnime(anime, user);
                    setFavAnime((prev) => [
                      ...prev,
                      {
                        animeId: anime.mal_id,
                      },
                    ]);
                  }}
                >
                  Add anime to the list
                </button>
              )
            ) : null}
          </div>
        );
      })
    ) : (
      <h1>loading...</h1>
    );

  return <section className="animelist-section">{animeListHTML}</section>;
}
