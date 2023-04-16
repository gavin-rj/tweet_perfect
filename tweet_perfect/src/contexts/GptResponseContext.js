// contexts/GptResponseContext.js
import { createContext } from 'react';

const GptResponseContext = createContext({
    gptResponse1: null,
    setGptResponse1: () => {},
    gptResponse2: null,
    setGptResponse2: () => {},
    gptResponse3: null,
    setGptResponse3: () => {},
  });

export default GptResponseContext;
