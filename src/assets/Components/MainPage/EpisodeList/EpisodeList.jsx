import React from "react";
import { getAnimeEpisodes } from "../../../utils/api";
import "./EpisodeList.css";

export default function EpisodeList({ id }) {
  const [episodeList, setEpisodeList] = React.useState();

  React.useEffect(() => {
    async function getData() {
      const data = await getAnimeEpisodes(id);
      setEpisodeList(data);
    }
    getData();
  }, []);
  const episodeHTML =
    episodeList && episodeList.length > 0 ? (
      episodeList.map((episode, index) => {
        return (
          <div className="episode-container">
            <a target="_blank" href={episode.forum_url}>
              {`${index}. ${episode.title}`}
            </a>
          </div>
        );
      })
    ) : (
      <h1>No data avalible</h1>
    );
  return <section className="episode-info">{episodeHTML}</section>;
}
