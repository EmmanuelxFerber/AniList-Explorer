export default function AnimeComponent({ anime, animeIndex, animationClass }) {
  const { title, genres, images, synopsis, score } = anime[animeIndex] || {};
  const genreString = genres ? genres.map((genre) => `${genre.name} `) : null;
  return (
    <div className={animationClass}>
      <div className="rand-anime-img-container">
        <img className="rand-anime-img" src={images.jpg.image_url} />
      </div>

      <div className="rand-anime-info">
        <div>
          <h1 className="rand-anime-title">{title}</h1>
          <p>Score: {score ? score : "n/a"}</p>
        </div>
        <p className="rand-anime-genre">{genreString}</p>
        <p className="rand-anime-description">{synopsis}</p>
      </div>
    </div>
  );
}
