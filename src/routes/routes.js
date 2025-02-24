import { CausePage } from '../pages/causePage/CausePage';
import { ChatPage } from '../pages/chatPage/ChatPage';
import { ChatPageTest } from '../pages/chatPageTest/ChatPageTest';
import { HomePage } from '../pages/homePage/HomePage';
import { LoginPage } from '../pages/loginPage/LoginPage';
import { RegisterPage } from '../pages/registerPage/RegisterPage';
import { UsersPage } from '../pages/usersPage/UsersPage';

const routes = [
  { path: '/home', element: <HomePage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/test/:receiverId', element: <ChatPageTest /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/cause/:id', element: <CausePage /> },
  { path: '*', element: <HomePage /> },
];

export default routes;
