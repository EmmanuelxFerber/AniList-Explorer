import React from "react";
import { getAnimeEpisodes } from "../../Api/api";

export default function EpisodeList({ id }) {
  const [episodeList, setEpisodeList] = React.useState();

  React.useEffect(() => {
    async function getData() {
      const data = await getAnimeEpisodes(id);
      console.log("episode list running");
      setEpisodeList(data);
    }
    getData();
  }, []);

  const episodeHTML =
    episodeList && episodeList.length > 0 ? (
      episodeList.map((episode) => {
        return (
          <section className="episode-info">
            <h2>
              <a target="_blank" href={episode.forum_url}>
                {episode.title}
              </a>
            </h2>
            <p>{episode.filer ? "filler episode" : "cannon episode"}</p>
          </section>
        );
      })
    ) : (
      <h1>No data avalible</h1>
    );
  return episodeHTML;
}
