"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // No need to redirect - the ProtectedRoute will handle that
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link href="/dashboard/shorturl" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 primary-text-color">URL Shortener</h3>
              <p className="text-gray-600">Create and manage shortened URLs for easy sharing.</p>
            </div>
          </Link>
          
          {/* Add more feature cards here in the future */}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || user?.email.split('@')[0]}!</h2>
          <div className="mb-4">
            <p className="text-gray-600">You are now logged in.</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Your Account Information</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 