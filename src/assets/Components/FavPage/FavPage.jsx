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
      console.log("fav page running");
      setFavAnime(data);
    }
    getData();
  }, []);

  const animeList = favAnime
    ? favAnime.map((anime) => {
        console.log(anime.addedAt);
        const genreString = anime.genres
          ? anime.genres.map((genre) => `${genre.name} `)
          : "no genres";

        return (
          <div key={anime.id} className="anime-container">
            <div className="anime-img-container">
              <img className="anime-img" src={anime.images.jpg.image_url} />
            </div>
            <div className="anime-info">
              <h1 className="anime-title">{anime.title}</h1>
              <p className="anime-genre">{genreString}</p>
              <p className="anime-description">{anime.synopsis}</p>
              <p>Added at: {anime.addedAt}</p>
            </div>

            <button
              onClick={() => {
                removeFavAnime(user.uid, anime.id);
                console.log(anime.id);
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
