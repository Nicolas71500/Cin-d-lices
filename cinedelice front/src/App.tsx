import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './components/App/Routes/HomePage/HomePage';

import RecipePage from './components/App/Routes/RecipePage/RecipePage';
import Header from './components/App/Header/Header';
import Footer from './components/App/Footer/Footer';
import Game from './components/App/Routes/EasterEgg/Easteregg';
import RegistrationPage from './components/App/Routes/RegistrationPage/RegistrationPage';
import LoginPage from './components/App/Routes/LoginPage/LoginPage';
import ProfilePage from './components/App/Routes/ProfilePage/ProfilePage';
import { CatalogPage } from './components/App/Routes/CatalogPage/CatalogPage';
import PageNotFound from './components/App/Routes/404NotFound/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './components/App/Footer/Contact';
import { LegalNotice } from './components/App/Footer/MentionsLegales';
import AdminPage from './components/App/Routes/AdminPage/AdminPage';
import FilmPage from './components/App/Routes/FilmPage/FilmPage';
import PublicProfilePage from './components/App/Routes/PublicProfilePage/PublicProfilePage';

function App() {
    return (
        <div className="app">
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogue" element={<CatalogPage />} />
                <Route path="/recette/:id" element={<RecipePage />} />
                <Route path="/film/:id" element={<FilmPage />} />
                <Route path="/profil/:userId" element={<PublicProfilePage />} />
                <Route path="/inscription" element={<RegistrationPage />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/profil/me" element={<ProfilePage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/game" element={<Game />} />
                <Route path="/mentions-legales" element={<LegalNotice />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>

            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
