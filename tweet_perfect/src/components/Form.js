// src/components/Header.js
import React, {useContext, useState} from 'react';
import GptResponseContext from '../contexts/GptResponseContext';


const Form = () => {

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
    setGptResponse1(responses[0]?.text || '');
    setGptResponse2(responses[1]?.text || '');
    setGptResponse3(responses[2]?.text || '');
;

  }
  

  return (
    <form className="form-group bg-light p-3 rounded" onSubmit={handleSubmit}> 
    <div className="mb-3">
      <label htmlFor="whitepaper" className="form-label">
        Whitepaper
      </label>
      <textarea
        className="form-control"
        id="whitepaper"
        placeholder="Enter whitepaper"
        rows='3'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}

      />
    </div>
    <div className="mb-3">
      <label htmlFor="tweetExamples" className="form-label">
        Tweet Examples
      </label>
      <textarea
        className="form-control"
        id="tweetExamples"
        placeholder="Enter tweet examples"
        rows='3'

      />
    </div>
    <div className="mb-3">
      <label htmlFor="socialMediaSite" className="form-label">
        Social Media Site
      </label>
      <select className="form-select" id="socialMediaSite">
        <option>Select a social media site</option>
        <option>Facebook</option>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
  );
};

export default Form;
