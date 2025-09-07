
import React, { useRef } from 'react';
import SendNotification from './SendNotification.jsx';
import { useSelector } from 'react-redux';

function Hero() {
  const auth = useSelector((state) => state.auth);
  const demoRef = useRef(null);
  const handleGetStarted = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300 overflow-hidden flex-1">
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
            <button
              className="cursor-pointer mt-4 px-8 py-3 bg-lime-700 text-white font-semibold rounded-full shadow-lg hover:bg-lime-800 transition-all duration-200"
              onClick={handleGetStarted}
            >
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
      {/* Demo Card Section */}
  <section ref={demoRef} className="flex justify-center items-center py-8 bg-transparent scroll-mt-32">
        <div className="bg-white/95 border-2 border-lime-300 rounded-2xl shadow-xl px-8 py-8 max-w-2xl w-full flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-lime-800 mb-2">How It Works</h2>
          <ol className="list-decimal list-inside text-lime-900 text-lg space-y-2">
            <li><span className="font-semibold">Write your exam name</span> and click <span className="font-semibold">Send Notification</span>. Your exam is saved notification is sent.</li>
            <li>If you want <span className="font-semibold">regular notifications</span>, just click <span className="bg-lime-200 px-2 py-1 rounded font-semibold">Start</span>.</li>
            <li>If you no longer want notifications, simply click <span className="bg-red-100 px-2 py-1 rounded font-semibold text-red-700">Stop</span>.</li>
          </ol>
          <p className="text-lime-700 text-base mt-2">Stay updated and never miss an exam again!</p>
        </div>
      </section>
      {auth.status ? (
        <SendNotification />
      ) : (
        <div className="flex justify-center items-center py-16">
          <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-12 max-w-md w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-lime-900 mb-4">Get Started</h2>
            <p className="text-lime-800 text-center mb-6">To access exam notifications and reminders, please <span className="font-semibold text-lime-900">login</span> first.</p>
            <span className="inline-block px-6 py-2 bg-lime-700 text-white rounded-full font-semibold">Login to Continue</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
