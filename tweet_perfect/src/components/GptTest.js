import React, { useState, useContext } from 'react';
import GptResponseContext from '../contexts/GptResponseContext';

const GptTest = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const { setGptResponse1, setGptResponse2, setGptResponse3 } = useContext(GptResponseContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await result.json();
    const responses = data.response;

    console.log('text')
console.log(data.response)
    setResponse(responses[0]?.text || '');
    setGptResponse1(responses[0]?.text || '');
    setGptResponse2(responses[1]?.text || '');
    setGptResponse3(responses[2]?.text || '');
;

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
