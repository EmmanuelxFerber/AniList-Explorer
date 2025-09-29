import {
  IsAnimeInFavList,
  DeleteAnimeByMal_id,
  addFavAnime,
} from "../../../Firebase/firebase";
import { useAuth } from "../../../Context/AuthContext";
import { useState, useEffect } from "react";

export default function AnimeComponent({ anime, animeIndex, animationClass }) {
  const { title, genres, images, synopsis, score, mal_id } =
    anime[animeIndex] || {};
  const genreString = genres ? genres.map((genre) => `${genre.name} `) : null;
  const { user } = useAuth();

  const [isFav, setIsFav] = useState(null);

  useEffect(() => {
    if (user) {
      IsAnimeInFavList(user.uid, mal_id);
    }
  }, [user]);

  return (
    <div className={animationClass}>
      <div className="rand-anime-img-container">
        <img className="rand-anime-img" src={images.jpg.image_url} />
      </div>

      <div className="rand-anime-info">
        <div>
          <h1 className="rand-anime-title">{title}</h1>
          <p>Score: {score ? score : "n/a"}</p>
        </div>
        <p className="rand-anime-genre">{genreString}</p>
        <p className="rand-anime-description">{synopsis}</p>
        {user ? (
          isFav ? (
            <button
              className="rand-anime-fav-btn"
              onClick={() => {
                DeleteAnimeByMal_id(user.uid, mal_id);
                setIsFav(false);
              }}
            >
              Remove anime from the list
            </button>
          ) : (
            <button
              className="rand-anime-fav-btn"
              onClick={() => {
                addFavAnime(anime[animeIndex], user);
                setIsFav(true);
              }}
            >
              Add anime to the list
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}
