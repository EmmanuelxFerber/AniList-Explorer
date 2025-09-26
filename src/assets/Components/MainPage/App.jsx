import React from "react";
import "./App.css";
import { getRandomTopAnime } from "../../Api/api";
import { useAuth } from "../../Context/AuthContext";
import EpisodeList from "./EpisodeList/EpisodeList";
import { IsAnimeInFavList } from "../../Firebase/firebase";

function App() {
  const { user } = useAuth();
  const [anime, setAnime] = React.useState();
  const { title, genres, images, synopsis, episodes, mal_id, score } =
    anime || {};
  const [epsDisplayed, setEpsDisplayed] = React.useState(false);
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // const data = await getRandomAnime();
    setEpsDisplayed(false);
    const data = await getRandomTopAnime();
    await setAnime(data);
  }

  function displayEps() {
    setEpsDisplayed((oldDisplay) => !oldDisplay);
  }

  const genreString = genres ? genres.map((genre) => `${genre.name} `) : null;
  return (
    <>
      <main>
        <button onClick={getData}>next</button>
        {anime ? (
          <>
            <div className="rand-anime-container">
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
              </div>
            </div>

            <button onClick={displayEps} className="rand-anime-ep-number">
              List of episodes ({episodes})
            </button>
            {epsDisplayed ? (
              <EpisodeList
                className="rand-anime-episodes"
                id={mal_id}
                episodeNumber={episodes}
              />
            ) : null}
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </main>
    </>
  );
}

export default App;
