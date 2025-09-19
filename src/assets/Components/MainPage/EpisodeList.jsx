import React from "react";
import { getAnimeEpisodes } from "../../Api/api";

export default function EpisodeList({ id }) {
  const [episodeList, setEpisodeList] = React.useState();

  React.useEffect(() => {
    async function getData() {
      const data = await getAnimeEpisodes(id);
      console.log(id);
      setEpisodeList(data);
    }
    getData();
  }, []);

  console.log(episodeList);
  return <h1>list of episodes</h1>;
}
