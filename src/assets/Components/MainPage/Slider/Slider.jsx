import EpisodeList from "../EpisodeList/EpisodeList";
import AnimeComponent from "./AnimeComponent";
import React from "react";
import "./AnimeComponent";

export default function Slider({
  anime,
  epsDisplayed,
  displayEps,
  animeIndex,
  incrementAnimeIndex,
}) {
  const { episodes, mal_id } = anime[animeIndex] || {};
  const [sliding, setSliding] = React.useState(false);
  const animationClass1 = sliding
    ? "rand-anime-container slide"
    : "rand-anime-container";
  const animationClass2 = sliding
    ? "rand-anime-container postSlide"
    : "rand-anime-container preSlide";

  function SlideForward() {
    // Step 1: Start the slide animation
    setSliding(true);

    // Step 2: Wait for animation to finish before switching anime
    setTimeout(() => {
      incrementAnimeIndex(); // move to next anime
      setSliding(false); // reset class
    }, 500);
  }

  return (
    <>
      <button disabled={sliding ? true : false} onClick={SlideForward}>
        next
      </button>
      <div className="slide-container">
        <AnimeComponent
          anime={anime}
          animeIndex={animeIndex - 1}
          animationClass={animationClass1}
        />
        <AnimeComponent
          anime={anime}
          animeIndex={animeIndex}
          animationClass={animationClass2}
        />
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
  );
}
