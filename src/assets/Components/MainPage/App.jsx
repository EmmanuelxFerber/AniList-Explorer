import React from "react";
import "./App.css";
import { getRandomTopAnimeArray } from "../../utils/api";

import Slider from "./Slider/Slider";
import { IsAnimeInFavList } from "../../Firebase/firebase";

function App() {
  const [anime, setAnime] = React.useState();
  const [epsDisplayed, setEpsDisplayed] = React.useState(false);
  const [animeIndex, setAnimeIndex] = React.useState(0);
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // const data = await getRandomAnime();
    const data = await getRandomTopAnimeArray();
    setAnime(data);
  }
  function incrementAnimeIndex() {
    const animeArrayLength = anime.length;
    if (animeIndex !== animeArrayLength - 1) {
      setAnimeIndex((old) => old + 1);
    } else {
      getData();
      setAnimeIndex(0);
    }

    setEpsDisplayed(false);
  }

  function displayEps() {
    setEpsDisplayed((oldDisplay) => !oldDisplay);
  }

  return (
    <>
      <main>
        {anime ? (
          <Slider
            anime={anime}
            displayEps={displayEps}
            epsDisplayed={epsDisplayed}
            getData={getData}
            incrementAnimeIndex={incrementAnimeIndex}
            animeIndex={animeIndex}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </main>
    </>
  );
}

export default App;
