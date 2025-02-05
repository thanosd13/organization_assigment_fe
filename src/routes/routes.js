import { HomePage } from '../pages/homePage/HomePage';
import { LoginPage } from '../pages/loginPage/LoginPage';
import { RegisterPage } from '../pages/registerPage/RegisterPage';

const routes = [
  { path: '/home', element: <HomePage />, showHeaderAndFooter: true },
  { path: '/register', element: <RegisterPage />, showHeaderAndFooter: false },
  { path: '/login', element: <LoginPage />, showHeaderAndFooter: false },
  { path: '*', element: <HomePage />, showHeaderAndFooter: true },
];

export default routes;
