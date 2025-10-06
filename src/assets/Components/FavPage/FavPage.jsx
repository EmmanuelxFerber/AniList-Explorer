import React from "react";
import { getUserAnimeList, removeFavAnime } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";
import "./FavPage.css";

export default function FavPage() {
  const { user } = useAuth();
  const [favAnime, setFavAnime] = React.useState(null);
  const [datailedanimeIds, setDetailedAnimeIds] = React.useState([]);
  React.useEffect(() => {
    const userID = user.uid;
    async function getData() {
      const data = await getUserAnimeList(userID);
      setFavAnime(data);
    }
    getData();
  }, []);

  function displayDetailed(animeId) {
    setDetailedAnimeIds((prev) =>
      prev.includes(animeId)
        ? prev.filter((id) => id !== animeId)
        : [...prev, animeId]
    );
  }

  const sortedByDateAnime = favAnime
    ? [...favAnime].sort((a, b) => {
        const parseDate = (dateSrt) => {
          const [day, month, year] = dateSrt.split(".").map(Number);
          return new Date(year, month - 1, day);
        };

        return parseDate(b.addedAt) - parseDate(a.addedAt);
      })
    : [];

  const animeList = sortedByDateAnime
    ? sortedByDateAnime.map((anime) => {
        const { addedAt, genres, synopsis, id, images, title, url } = anime;
        const genreString = genres
          ? genres.map((genre) => `${genre.name} `)
          : "no genres";

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
              <p
                onClick={() => displayDetailed(id)}
                className={`anime-description ${
                  datailedanimeIds.includes(id) ? "detailed" : ""
                }`}
              >
                {synopsis}
              </p>
              <p className="anime-added-at">Added at: {addedAt}</p>
            </div>

            <button
              className="rand-anime-btn"
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
