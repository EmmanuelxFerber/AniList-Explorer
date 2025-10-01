import React from "react";
import { getUserAnimeList, removeFavAnime } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";
import "./FavPage.css";

export default function FavPage() {
  const { user } = useAuth();
  const [favAnime, setFavAnime] = React.useState(null);
  React.useEffect(() => {
    const userID = user.uid;
    async function getData() {
      const data = await getUserAnimeList(userID);
      setFavAnime(data);
    }
    getData();
  }, []);

  const animeList = favAnime
    ? favAnime.map((anime) => {
        const { addedAt, genres, synopsis, id, images, title, url } = anime;
        const genreString = genres
          ? genres.map((genre) => `${genre.name} `)
          : "no genres";
        // const synopsisShortened = synopsis
        //   ? synopsis.split(" ").length > 150
        //     ? synopsis.split(" ").slice(0, 150).join(" ") + "..."
        //     : synopsis
        //   : null;

        return (
          <div key={id} className="anime-container">
            <div className="anime-img-container">
              <img className="anime-img" src={images.jpg.image_url} />
            </div>
            <div className="anime-info">
              <a href={url} target="_blank">
                <h1 className="rand-anime-title">{title}</h1>
              </a>
              <p className="anime-genre">{genreString}</p>
              <p className="anime-description">{synopsis}</p>
              <p className="anime-added-at">Added at: {addedAt}</p>
            </div>

            <button
              onClick={() => {
                removeFavAnime(user.uid, anime.id);
                setFavAnime((prevAnime) =>
                  prevAnime.filter((a) => a.id !== anime.id)
                );
              }}
            >
              Remove from favorites
            </button>
          </div>
        );
      })
    : null;
  return (
    <section className="animelist-section">
      <h1>Your fav animes</h1>
      {animeList}
    </section>
  );
}
