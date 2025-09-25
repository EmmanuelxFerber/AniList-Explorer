import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAnimeSearch } from "../../Api/api";
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
  const [favAnime, setFavAnime] = useState(null);

  console.log(animeList);
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

  const animeListHTML =
    animeList || favAnime ? (
      animeList.map((anime) => {
        const { title, genres, images, synopsis, mal_id } = anime || {};
        const genreString = genres
          ? genres.map((genre) => `${genre.name} `)
          : "no genres";
        const isInFavList = favAnime?.some((anime) => anime.animeId === mal_id);
        return (
          <div key={mal_id} className="anime-container">
            <img className="anime-img" src={images.jpg.image_url} />
            <div className="anime-info">
              <h1 className="anime-img">{title}</h1>
              <p className="anime-genre">{genreString}</p>
              <p className="anime-description">{synopsis}</p>
            </div>

            {isInFavList ? (
              <button
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
            )}
          </div>
        );
      })
    ) : (
      <h1>loading...</h1>
    );

  return <section className="animelist-section">{animeListHTML}</section>;
}
