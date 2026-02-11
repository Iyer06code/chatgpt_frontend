import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg transition-all duration-500 hover:bg-white/30 hover:shadow-2xl hover:border-white/40 hover:backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                            MyApp
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <NavLink to="/" text="Home" />
                        <NavLink to="/about" text="About" />
                        <NavLink to="/contact" text="Contact" />
                        <NavLink to="/login" text="Login" />
                        <NavLink to="/signup" text="Sign Up" />
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button (placeholder) */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

const NavLink = ({ to, text }) => (
    <Link
        to={to}
        className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group"
    >
        {text}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </Link>
)

export default Header

