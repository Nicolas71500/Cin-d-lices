import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './styles/main.scss';
import { AuthProvider } from './components/App/Context/Authentification/Authentification.tsx';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>,
    /* </StrictMode>, */
);
