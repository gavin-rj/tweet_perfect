import React, { useState } from 'react';

const GptTest = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await result.json();
    setResponse(data.response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default GptTest;
