import { Link } from 'react-router-dom';
import './PageNotFound.scss';

function PageNotFound() {
    return (
        <div className="not-found-page">
            <p className="not-found-code">404</p>
            <h1 className="not-found-title">Page introuvable</h1>
            <p className="not-found-message">
                Cette page est aussi introuvable qu'un ramen dans un film de science-fiction…
            </p>
            <Link to="/catalogue" className="btn-filled">
                Retour au catalogue
            </Link>
        </div>
    );
}

export default PageNotFound;
