import React from 'react';

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-6 py-16 mx-auto">
        <div className="flex-1 flex flex-col items-start gap-6 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-lime-900 drop-shadow-lg">
            ExamNotifier
          </h1>
          <p className="text-lg md:text-2xl text-lime-800 max-w-xl">
            Never miss an important Govt exam notification again!<br />
            Get timely reminders, updates, and all the details you need—delivered straight to your inbox.
          </p>
          <button className="cursor-pointer mt-4 px-8 py-3 bg-lime-700 text-white font-semibold rounded-full shadow-lg hover:bg-lime-800 transition-all duration-200">
            Get Started
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center mt-10 lg:mt-0">
          <img
            src="https://art.pixilart.com/sr5za5962a1ab5aws3.gif"
            alt="Retro pixelated animation"
            className="w-72 h-72 object-contain rounded-2xl border-4 border-lime-700 shadow-xl hover:scale-105 transition-transform duration-250"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
