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
  const [animationClass, setAnimationClass] = React.useState(
    "rand-anime-container"
  );

  function SlideForward() {
    // Step 1: Start the slide animation
    setAnimationClass("rand-anime-container slide");

    // Step 2: Wait for animation to finish before switching anime
    setTimeout(() => {
      incrementAnimeIndex(); // move to next anime
      setAnimationClass("rand-anime-container"); // reset class
    }, 500); // duration must match your CSS transition time
  }

  return (
    <>
      <button onClick={SlideForward}>next</button>
      <div className="slide-container">
        <AnimeComponent
          anime={anime}
          animeIndex={animeIndex}
          animationClass={animationClass}
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
