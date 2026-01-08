import { RouteObject } from 'react-router-dom';
import { AdminLayout } from '../layout/AdminLayout';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminPosts } from '../pages/AdminPosts';
import { AdminPostNew } from '../pages/AdminPostNew';
import { AdminPostEdit } from '../pages/AdminPostEdit';
import { AdminCategories } from '../pages/AdminCategories';
import { AdminMedia } from '../pages/AdminMedia';
import { AdminSettings } from '../pages/AdminSettings';
import { AdminRouteGuard } from './AdminRouteGuard';

export const adminRoutes: RouteObject = {
    path: '/admin',
    element: (
        <AdminRouteGuard>
            <AdminLayout />
        </AdminRouteGuard>
    ),
    children: [
        {
            index: true,
            element: <AdminDashboard />,
        },
        {
            path: 'posts',
            children: [
                {
                    index: true,
                    element: <AdminPosts />,
                },
                {
                    path: 'new',
                    element: <AdminPostNew />,
                },
                {
                    path: ':id',
                    element: <AdminPostEdit />,
                },
            ]
        },
        {
            path: 'categories',
            element: <AdminCategories />,
        },
        {
            path: 'media',
            element: <AdminMedia />,
        },
        {
            path: 'settings',
            element: <AdminSettings />,
        },
    ],
};
