import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-600">MyApp</h1>
                </div>
                <nav className="mt-6">
                    <Link to="/dashboard" className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border-r-4 border-indigo-600 bg-indigo-50">
                        Overview
                    </Link>
                    <Link to="/profile" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 border-r-4 border-transparent transition-colors">
                        Profile
                    </Link>
                    <Link to="/settings" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 border-r-4 border-transparent transition-colors">
                        Settings
                    </Link>
                    <Link to="/" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-500 border-r-4 border-transparent transition-colors mt-10">
                        Logout
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                        <p className="text-gray-500">Welcome back, User!</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            U
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Projects" value="12" color="bg-blue-500" />
                    <StatCard title="Active Users" value="1,234" color="bg-green-500" />
                    <StatCard title="Revenue" value="$45,678" color="bg-purple-500" />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <ActivityItem action="Project Created" time="2 hours ago" />
                        <ActivityItem action="New User Registered" time="4 hours ago" />
                        <ActivityItem action="System Update" time="1 day ago" />
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center mr-4`}>
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

const ActivityItem = ({ action, time }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
        <span className="text-gray-700 font-medium">{action}</span>
        <span className="text-gray-400 text-sm">{time}</span>
    </div>
);

export default Dashboard;