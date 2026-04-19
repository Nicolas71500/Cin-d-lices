import './encrage.scss';

export const Encrage = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button className="encrage-btn" onClick={scrollToTop} title="Haut de page" aria-label="Retour en haut">
            ↑
        </button>
    );
};

export default Encrage;
