import { Header } from './components/header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './footer/Footer';
import routes from './routes/routes';
import './styles/style.css';

function App() {
  const location = useLocation();
  function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  const currentRoute =
    routes.find(route => route.path === location.pathname) || {};
  return (
    <div>
      {currentRoute?.showHeaderAndFooter ||
        (isEmptyObject(currentRoute) && <Header />)}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      {currentRoute?.showHeaderAndFootercurrentRoute?.showHeaderAndFooter ||
        (isEmptyObject(currentRoute) && <Footer />)}
    </div>
  );
}

export default App;
