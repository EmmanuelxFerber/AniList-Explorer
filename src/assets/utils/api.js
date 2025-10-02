import { shuffle } from "./utils";

export async function getRandomTopAnimeArray() {
  let randomPage = Math.floor(Math.random() * 40);

  const res = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=${randomPage}`
  );
  const data = await res.json();
  const filterMature = data.data.filter(
    (anime) => anime.rating !== "RX - Hentai"
  );
  let randomAnimeArray = shuffle(filterMature);
  return randomAnimeArray;
}

export async function getRandomFilteredAnimeArray(query) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime${query[0].filterQuery}`
    );

    const data = await res.json();
    const totalPages = data.pagination.last_visible_page;
    let randomPage;
    if (totalPages < 20) {
      randomPage = Math.floor(Math.random() * totalPages);
    } else {
      randomPage = Math.floor(Math.random() * 20);
    }

    const randRes = await fetch(
      `https://api.jikan.moe/v4/anime${query[0].filterQuery}&page=${randomPage}`
    );
    const randData = await randRes.json();

    const filterMature = randData.data.filter(
      (anime) => anime.rating !== "RX - Hentai"
    );

    let randomAnimeArray = shuffle(filterMature);
    return randomAnimeArray;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAnimeById(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
}

export async function getAnimeEpisodes(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);

  const data = await res.json();
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

export async function getAllGenres() {
  const res = await fetch("https://api.jikan.moe/v4/genres/anime");
  const data = await res.json();
  return data.data;
}
