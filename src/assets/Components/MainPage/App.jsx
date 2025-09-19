import React from "react";
import { Outlet } from "react-router";

import "./App.css";
import { getRandomAnime } from "../../Api/api";

import EpisodeList from "./EpisodeList";

function App() {
  const [anime, setAnime] = React.useState();
  const { title, genres, images, synopsis, episodes, mal_id } = anime || {};
  React.useEffect(() => {
    async function getData() {
      const data = await getRandomAnime();
      await setAnime(data);
    }
    getData();
  }, []);

  const genreString = genres ? genres.map((genre) => `${genre.name} `) : null;
  return (
    <section>
      {anime ? (
        <>
          <img src={images.jpg.image_url} />
          <h1>{title}</h1>
          <p>{genreString}</p>
          <p>{synopsis}</p>
          <p>List of episodes ({episodes})</p>
          <EpisodeList id={mal_id} episodeNumber={episodes} />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </section>
  );
}

export default App;
