import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="footer-strip" />
        <p className="footer-brand">
            <span>C</span>iné<span>D</span>élices
        </p>
        <nav>
            <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
            <span className="footer-sep">·</span>
            <Link to="/contact" className="footer-link">Contact</Link>
            <span className="footer-sep">·</span>
            <Link to="/game" className="footer-link">Mini-jeu</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} CinéDélices — Tous droits réservés</p>
    </footer>
);

export default Footer;
