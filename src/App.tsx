import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { adminRoutes } from './admin/routes/adminRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    adminRoutes,
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
