import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <div className="max-w-md text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to OlaPathFinder!</h1>
        <p className="text-lg text-gray-600">
          Plan your commute efficiently with real-time updates and personalized routes.
        </p>
      </div>
    </div>
  );
}

export default Home;
