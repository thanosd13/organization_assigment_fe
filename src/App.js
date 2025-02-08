import { Header } from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './footer/Footer';
import routes from './routes/routes';
import './styles/style.css';
import { Loader } from './components/loader/Loader';

function App() {
  return (
    <div>
      <Loader />
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
