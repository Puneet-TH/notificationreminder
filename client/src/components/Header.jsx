import React from 'react';

function Header() {
    return (
        <header className="bg-[#3D4127] shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-evenly px-6 py-4">
                {/* Logo/Brand */}
                {/* Navigation */}
                    <button className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer">
                        Home
                    </button>
                    <button className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer">
                        Login
                    </button>
                    {/* Show Logout only if authenticated (placeholder for now) */}
                    <button className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer">
                        Logout
                    </button>
            </div>
        </header>
    );
}

export default Header;
