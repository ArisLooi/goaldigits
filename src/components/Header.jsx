import React, { useState, useContext, useEffect, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { FaLocationArrow, FaRocketchat, FaBell, FaRegUser, FaMoon, FaSun, FaAdjust } from 'react-icons/fa';
import ChatbotModal from '../components/ChatbotModal';

const Header = () => {
    // State to track mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State to handle chatbot modal visibility
    const [showChatbot, setShowChatbot] = useState(false);

    // State to track the current theme (light, dark, or system)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    // Firebase authentication instance
    const auth = getAuth();

    // React Router's location hook to identify the current page
    const location = useLocation();

    // Access the current user from the AuthContext
    const { currentUser } = useContext(AuthContext);

    // Function to close the chatbot modal
    const handleCloseChatbot = () => setShowChatbot(false);

    // Function to show the chatbot modal
    const handleShowChatbot = () => setShowChatbot(true);

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Function to toggle the theme (light -> dark -> system)
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        setTheme(nextTheme);
    };

    // Effect to apply the current theme to the document root
    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'system') {
            // Check if the system prefers dark mode
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', systemPrefersDark);
        } else {
            // Apply light or dark theme explicitly
            root.classList.toggle('dark', theme === 'dark');
        }

        // Save the selected theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect to handle system theme changes when the theme is set to "system"
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.classList.toggle('dark', e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        // Clean up the event listener on component unmount
        return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    // Helper function to determine the className for navigation links
    const getLinkClassName = (path) =>
        location.pathname === path
            ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
            : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white';

    // Function to toggle the mobile menu visibility
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <FaLocationArrow className='text-white' />
                            </div>
                            <h1 className='ml-1sw text-lg text-white'>GoalDigits</h1>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {/* <Link to="/budgets" className={getLinkClassName("/budgets")}>Set Goals</Link> */}
                                    <Link to="/transactions" className={getLinkClassName("/transactions")}>Keep Track</Link>
                                    <Link to="/reports" className={getLinkClassName("/reports")}>See Progress</Link>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    onClick={toggleTheme}
                                    className="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    {theme === 'light' && <FaSun />}
                                    {theme === 'dark' && <FaMoon />}
                                    {theme === 'system' && <FaAdjust />}
                                </button>
                                <button onClick={handleShowChatbot} type="button" className="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Get help</span>
                                    <FaRocketchat />
                                </button>
                                <button type="button" className="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <FaBell />
                                </button>

                                {/* Profile dropdown */}
                                <div className="relative ml-3">
                                    <div>
                                        <button type="button" className="relative flex max-w-xs items-center rounded-full text-gray-400 hover:text-white bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <FaRegUser />
                                        </button>
                                    </div>

                                    {isMobileMenuOpen && (
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">My Profile</Link>
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                                            <Link to="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {
                    isMobileMenuOpen && (
                        <div className="md:hidden" id="mobile-menu">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {/* <Link to="/budgets" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Set Goals</Link> */}
                                <Link to="/transactions" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Keep Track</Link>
                                <Link to="/reports" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">See Progress</Link>
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    {/* <div className="shrink-0">
                                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User Profile" />
                                </div> */}
                                    {/* <div className="ml-3">
                                    <div className="text-base font-medium text-white">Tom Cook</div>
                                    <div className="text-sm font-medium text-gray-400">tom@example.com</div>
                                </div> */}
                                    <button
                                        onClick={toggleTheme}
                                        className="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        {theme === 'light' && <FaSun />}
                                        {theme === 'dark' && <FaMoon />}
                                        {theme === 'system' && <FaAdjust />}
                                    </button>
                                    <button onClick={handleShowChatbot} type="button" className="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Get help</span>
                                        <FaRocketchat />
                                    </button>
                                    <button type="button" className="relative shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-none focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">View notifications</span>
                                        <FaBell />
                                    </button>

                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <Link to="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">My Profile</Link>
                                    <Link to="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</Link>
                                    <Link to="#" onClick={handleLogout} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </nav >
            <ChatbotModal show={showChatbot} handleClose={handleCloseChatbot} />
        </div >
    );
}
export default Header