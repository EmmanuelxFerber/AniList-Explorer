export async function getRandomAnime() {
  const res = await fetch("https://api.jikan.moe/v4/random/anime");
  const data = await res.json();
  return data.data;
}

export async function getAnimeById(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
}

export async function getAnimeEpisodes(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);

  const data = await res.json();
  console.log(`https://api.jikan.moe/v4/anime/${id}/episodes`);
  return data.data;
}

export async function getAnimeEpisode(id, number) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/episodes/${number}`
  );
  const data = await res.json();
  return data.data;
}

export async function getAnimeSearch(animeName) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`);
  const data = await res.json();
  return data.data;
}
