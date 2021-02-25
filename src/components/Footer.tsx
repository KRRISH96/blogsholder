import * as React from 'react';

function Footer() {
  return (
    <footer>
      <span className="copyright">
        © {new Date().getFullYear()}, Made with
        <span role="img" aria-label="heart">
          {' ❤️ '}
        </span>
        by{' '}
        <a
          href="https://saikrishna.dev"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Sai Krishna Prasad Kandula.
        </a>
      </span>
    </footer>
  );
}

export default Footer;
