import React from 'react';



function Footer() {
    return (
        <footer className="bg-[#3D4127] py-4 w-full">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 px-4">
                <span className="text-lime-200 text-sm md:text-base font-semibold tracking-wide">
                    © {new Date().getFullYear()} ExamNotifier. Created by <span className="text-lime-400 font-bold">Puneet Thapliyal</span> <span role="img" aria-label="heart">❤️</span>
                </span>
                <span className="text-lime-300 text-xs opacity-70">All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
