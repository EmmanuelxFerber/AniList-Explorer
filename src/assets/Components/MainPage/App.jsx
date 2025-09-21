import React from "react";
import { Outlet } from "react-router";

import "./App.css";
import { getRandomAnime } from "../../Api/api";

import EpisodeList from "./EpisodeList";
import Header from "../Header";
import Footer from "../Footer";

function App() {
  const [anime, setAnime] = React.useState();
  const { title, genres, images, synopsis, episodes, mal_id, score } =
    anime || {};
  const [epsDisplayed, setEpsDisplayed] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      const data = await getRandomAnime();
      await setAnime(data);
    }
    getData();
  }, []);

  function displayEps() {
    setEpsDisplayed((oldDisplay) => !oldDisplay);
  }
  console.log(episodes);

  const genreString = genres ? genres.map((genre) => `${genre.name} `) : null;
  return (
    <>
      <main>
        {anime ? (
          <>
            <div className="rand-anime-container">
              <div className="rand-anime-img-container">
                <img className="rand-anime-img" src={images.jpg.image_url} />
              </div>

              <div className="rand-anime-info">
                <h1 className="rand-anime-title">{title}</h1>
                <p>Score: {score ? score : "n/a"}</p>
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
