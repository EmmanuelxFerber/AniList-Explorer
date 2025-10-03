import React from "react";
import "./App.css";
import {
  getRandomTopAnimeArray,
  getRandomFilteredAnimeArray,
} from "../../utils/api";

import Slider from "./Slider/Slider";
import { IsAnimeInFavList, getUserFilter } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";

function App() {
  const [anime, setAnime] = React.useState();
  const [epsDisplayed, setEpsDisplayed] = React.useState(false);
  const [animeIndex, setAnimeIndex] = React.useState(1);
  const { user, loading } = useAuth();
  const [error, setError] = React.useState(false);

  //loads data only if fetching authentication is completed
  React.useEffect(() => {
    if (!loading) {
      getData();
    }
  }, [loading]);

  async function getData() {
    if (user) {
      setError(false);
      const filterQuery = await getUserFilter(user.uid);
      if (!filterQuery) {
        const data = await getRandomTopAnimeArray();
        if (!data) {
          setError(true);
        }
        setAnime(data);
      } else {
        const data = await getRandomFilteredAnimeArray(filterQuery);
        if (!data) {
          setError(true);
        }
        setAnime(data);
      }
    } else {
      const data = await getRandomTopAnimeArray();
      if (!data) {
        setError(true);
      }
      setAnime(data);
    }
  }
  function incrementAnimeIndex() {
    const animeArrayLength = anime.length;
    if (animeIndex !== animeArrayLength - 1) {
      setAnimeIndex((old) => old + 1);
    } else {
      getData();
      setAnimeIndex(1);
    }

    setEpsDisplayed(false);
  }

  function displayEps() {
    setEpsDisplayed((oldDisplay) => !oldDisplay);
  }
  let renderState;

  if (error) {
    renderState = (
      <h2>There was an error fetching anime data, please refresh the site</h2>
    );
  } else if (!anime) {
    renderState = <h2>Loading...</h2>;
  } else {
    renderState = (
      <Slider
        anime={anime}
        displayEps={displayEps}
        epsDisplayed={epsDisplayed}
        getData={getData}
        incrementAnimeIndex={incrementAnimeIndex}
        animeIndex={animeIndex}
      />
    );
  }

  return (
    <>
      <main>{renderState}</main>
    </>
  );
}

export default App;
