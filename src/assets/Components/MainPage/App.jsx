import React from "react";
import "./App.css";
import {
  getRandomTopAnimeArray,
  getRandomFilteredAnimeArray,
  useFetchAndCheck,
} from "../../utils/api";

import Slider from "./Slider/Slider";
import { IsAnimeInFavList, getUserFilter } from "../../Firebase/firebase";
import { useAuth } from "../../Context/AuthContext";

function App() {
  const [epsDisplayed, setEpsDisplayed] = React.useState(false);
  const [animeIndex, setAnimeIndex] = React.useState(1);
  const { user, loading } = useAuth();
  const { status, error, data, fetch } = useFetchAndCheck(getData);

  //loads data only if fetching authentication is completed
  React.useEffect(() => {
    if (!loading) {
      fetch();
    }
  }, [loading]);

  async function getData() {
    let data;
    if (user) {
      const filterQuery = await getUserFilter(user.uid);
      if (!filterQuery) {
        data = await getRandomTopAnimeArray();
      } else {
        data = await getRandomFilteredAnimeArray(filterQuery);
      }
    } else {
      data = await getRandomTopAnimeArray();
    }
    return data;
  }
  function incrementAnimeIndex() {
    const animeArrayLength = data.length;
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
  if (status === "loading") renderState = <h2>Loading...</h2>;
  if (status === "error") {
    console.log(error);
    renderState = (
      <p>{`There was an error fetching anime data, please refresh the site`}</p>
    );
  }
  if (status === "empty") renderState = <p>No anime matched your filter.</p>;
  if (status === "success") {
    renderState = (
      <Slider
        anime={data}
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
