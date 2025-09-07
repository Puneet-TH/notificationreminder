

import { useState } from 'react';
import { exam } from '../services/api';

function SendNotification() {
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [regular, setRegular] = useState(false);
  const [cronLoading, setCronLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Always create the exam first
      const res = await exam.createExam({ examName });
      // Then send notification or start cron as needed
      if (regular) {
        try {
          await exam.startChronJob();
          setMessage('Regular notifications started! You will receive updates via email.');
        } catch (err) {
          if (err.response && err.response.data && err.response.data.message === 'Notification job already running') {
            setMessage('Regular notifications are already scheduled.');
          } else {
            setMessage('Failed to start regular notifications.');
          }
        }
      } else {
        await exam.sendingNotification();
        setMessage('One-time notification sent!');
      }
      setExamName('');
    } catch (err) {
      setMessage('Failed to set up notification. Please try again.');
    }
    setLoading(false);
  };

  const handleStartCron = async () => {
    setCronLoading(true);
    setMessage('');
    try {
      // Require examName to create exam before starting cron
      if (!examName) {
        setMessage('Please enter an exam name first.');
        setCronLoading(false);
        return;
      }
      await exam.createExam({ examName });
      try {
        await exam.startChronJob();
        setMessage('Regular notifications started!');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message === 'Notification job already running') {
          setMessage('Regular notifications are already scheduled.');
        } else {
          setMessage('Failed to start regular notifications.');
        }
      }
    } catch {
      setMessage('Failed to start regular notifications.');
    }
    setCronLoading(false);
  };

  const handleStopCron = async () => {
    setCronLoading(true);
    setMessage('');
    try {
      await exam.stopChronJob();
      setMessage('Regular notifications stopped.');
    } catch {
      setMessage('Failed to stop regular notifications.');
    }
    setCronLoading(false);
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300 overflow-hidden p-7">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xl px-6 py-12 mx-auto bg-white/80 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-lime-900">Get Exam Notifications</h2>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          placeholder="Enter exam name (e.g. SSC CGL 2025)"
          className="w-full px-4 py-3 rounded-lg border-2 border-lime-400 focus:outline-none focus:border-lime-700 text-lg"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-lime-700 text-white font-semibold rounded-full shadow-lg hover:bg-lime-800 transition-all duration-200"
          disabled={loading}
        >
          {loading ? (regular ? 'Setting up regular notifications...' : 'Sending notification...') : (regular ? 'Start Regular Notifications' : 'Send One-Time Notification')}
        </button>
        <div className="flex gap-4 w-full justify-center mt-2">
          <button
            type="button"
            className="px-5 py-2 bg-lime-200 text-lime-900 border border-lime-700 rounded-full font-semibold shadow hover:bg-lime-300 hover:text-lime-950 transition-all duration-200"
            onClick={handleStartCron}
            disabled={cronLoading}
          >
            {cronLoading ? 'Starting...' : 'Start Regular Notifications'}
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-red-200 text-red-900 border border-red-700 rounded-full font-semibold shadow hover:bg-red-300 hover:text-red-950 transition-all duration-200"
            onClick={handleStopCron}
            disabled={cronLoading}
          >
            {cronLoading ? 'Stopping...' : 'Stop Regular Notifications'}
          </button>
        </div>
        {message && (
          <div className="w-full text-center mt-2 text-lime-800 font-medium">{message}</div>
        )}
      </form>
    </section>
  );
}

export default SendNotification;
