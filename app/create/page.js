// app/create/page.js

'use client'

import { useState } from 'react';

export default function CreatePage() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateStory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generateStory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'Tell me a story about a dragon.' }), // Change prompt as needed
      });

      const data = await response.json();
      if (response.ok) {
        setStory(data.story);
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Error connecting to the API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Story Generator</h1>
      <button
        onClick={generateStory}
        className="px-6 py-2 bg-blue-500 text-white rounded-full mb-4"
      >
        Generate Story
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {story && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mt-4">
          <h2 className="text-xl font-semibold mb-4">Generated Story</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}
