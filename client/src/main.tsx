import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import Cart from './pages/Cart.js';
import Contact from './pages/Contact.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/Home',
        element: <Home />
      }, 
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
