
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/auth.js';
import { useNavigate } from 'react-router-dom';

function Header() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <header className="bg-[#3D4127] shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-evenly px-6 py-4">
                <button className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer" onClick={handleHome}>
                    Home
                </button>
                {!auth.status ? (
                  <>
                    <button
                        className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button
                        className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                  </>
                ) : (
                  <>
                    <button
                        className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer"
                        onClick={handleProfile}
                    >
                        Profile
                    </button>
                    <button
                        className="px-5 py-2 rounded-full font-semibold text-lime-900 bg-lime-200 border border-lime-700 hover:bg-lime-300 hover:text-lime-950 transition-all duration-200 shadow cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                  </>
                )}
            </div>
        </header>
    );
}

export default Header;
