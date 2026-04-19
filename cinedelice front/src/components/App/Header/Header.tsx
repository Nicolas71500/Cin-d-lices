import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faUtensils, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import './header.scss';
import { useAuthContext } from '../Context/Authentification/useAuthContext';

function Header() {
    const [isMenuOpen,   setIsMenuOpen]   = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDark, setIsDark]             = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const { userAuth, handleLogout } = useAuthContext();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const closeMenu    = () => setIsMenuOpen(false);
    const toggleMenu   = () => setIsMenuOpen(prev => !prev);
    const toggleSearch = () => { setIsSearchOpen(prev => !prev); setIsMenuOpen(false); };
    const logout       = () => { handleLogout(); closeMenu(); };

    return (
        <div className="header">
            {/* Logo */}
            <Link to="/" className="logo-link" onClick={closeMenu}>
                <span className="logo-accent">C</span>iné
                <span className="logo-accent">D</span>élices
            </Link>

            {/* Username badge — desktop */}
            {userAuth?.username && isDesktop && (
                <span className="username-badge">{userAuth.username}</span>
            )}

            {/* Navigation droite */}
            <div className="flex items-center gap-2">
                {isDesktop ? (
                    <>
                        <Link to="/catalogue" className="nav-link" onClick={closeMenu}>Recettes</Link>
                        {userAuth?.role_id === 1 && (
                            <Link to="/admin" className="nav-link nav-link--admin" onClick={closeMenu}>Admin</Link>
                        )}
                    </>
                ) : (
                    <Link to="/catalogue" className="nav-icon-btn" onClick={closeMenu} title="Recettes">
                        <FontAwesomeIcon icon={faUtensils} />
                    </Link>
                )}

                <button className="nav-icon-btn" onClick={() => setIsDark(v => !v)} title={isDark ? 'Mode clair' : 'Mode sombre'}>
                    <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
                </button>

                <Link
                    to={userAuth?.username ? '/profil/me' : '/connexion'}
                    className="nav-icon-btn"
                    onClick={closeMenu}
                    title={userAuth?.username ? 'Mon profil' : 'Connexion'}
                >
                    <FontAwesomeIcon icon={faUser} />
                </Link>

                <button className="nav-icon-btn" onClick={toggleSearch} title="Rechercher">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <div className="burger-menu" onClick={toggleMenu}>
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                </div>
            </div>

            {isSearchOpen && <div className="search-bar"><SearchBar /></div>}

            {isMenuOpen && (
                <div className="mobile-menu">
                    {userAuth?.username && (
                        <div className="mobile-user-info">Connecté · {userAuth.username}</div>
                    )}
                    <Link to="/"           onClick={closeMenu}>Accueil</Link>
                    <Link to="/catalogue"  onClick={closeMenu}>Catalogue</Link>
                    {!userAuth && <>
                        <Link to="/connexion"   onClick={closeMenu}>Connexion</Link>
                        <Link to="/inscription" onClick={closeMenu}>Inscription</Link>
                    </>}
                    {userAuth?.role_id === 1 && (
                        <Link to="/admin" onClick={closeMenu}>Admin</Link>
                    )}
                    {userAuth?.username && (
                        <Link to="/profil/me" onClick={closeMenu}>Mon profil</Link>
                    )}
                    {userAuth?.username && (
                        <button onClick={logout}>Déconnexion</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
