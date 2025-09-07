import React from 'react';
import { useSelector } from 'react-redux';

function ProfilePage() {
  const auth = useSelector((state) => state.auth);
  if (!auth.status) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-10 max-w-md w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-lime-900 mb-4">Profile</h2>
          <p className="text-lime-800 text-center">You are not logged in.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-10 max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-lime-900 mb-4">Profile</h2>
        <p className="text-lime-800 text-center mb-2">Welcome, <span className="font-semibold">{auth.jsonData?.fullName || 'User'}</span>!</p>
        <p className="text-lime-800 text-center">Email: <span className="font-semibold">{auth.jsonData?.email || 'N/A'}</span></p>
      </div>
    </div>
  );
}

export default ProfilePage;
