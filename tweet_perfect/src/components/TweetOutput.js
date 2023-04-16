import React, { useContext } from 'react';
import GptResponseContext from '../contexts/GptResponseContext';


const TweetOutput = () => {
  const { gptResponse1, gptResponse2, gptResponse3 } = useContext(GptResponseContext);

  return (
    <div>
      <p>Content Here</p>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{gptResponse1 ? gptResponse1 : 'Tweet 1'}</h3>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{gptResponse2 ? gptResponse2 : 'Tweet 2'}</h3>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{gptResponse3 ? gptResponse3 : 'Tweet 3'}</h3>
        </div>
      </div>
    </div>
  );
};

export default TweetOutput;
