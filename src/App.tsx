import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { adminRoutes } from './admin/routes/adminRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { ForbiddenPage } from './pages/ForbiddenPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/403',
        element: <ForbiddenPage />,
    },
    adminRoutes,
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
