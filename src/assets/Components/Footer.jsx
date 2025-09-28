export default function Footer() {
  return (
    <footer>
      <div className="footer-info">
        <p>© 2025 AniList Explorer — Built by Emmanuel</p>
        <p>Powered by the Jikan API</p>
      </div>
      <nav className="footer-nav">
        <a
          href="https://github.com/EmmanuelxFerber/AniList-Explorer"
          target="_blank"
          aria-label="link to my GitHub"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/emmanuel-ferber-331972228/"
          target="_blank"
          aria-label="link to my LinkedIn"
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}
