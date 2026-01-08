import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <h1 className="text-6xl font-bold text-gray-200 mb-4">403</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-500 max-w-md mb-8">
                Sorry, you do not have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                    Back to Homepage
                </button>
                <button
                    onClick={() => navigate('/admin/login')}
                    className="border border-gray-300 text-gray-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                    Switch Account
                </button>
            </div>
        </div>
    );
}
