import {OpenAIApi, Configuration} from 'openai'

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION,
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const fetchGPTResponse = async (prompt) => {
    console.log('fetchGPTResponse')
    console.log('prompt: ' + prompt)
  const gptResponse = await openai.createCompletion({
    'model': 'text-davinci-003',
    'prompt': prompt,
    'max_tokens': 1000, 
    'n': 3,
    'temperature': 0.7,
  })
    console.log(gptResponse.data.choices)
    return gptResponse.data.choices;
}

export default async (req, res) => {
    if (req.method === 'POST') {
      const { prompt } = req.body;
  
      try {
        const gptResponse = await fetchGPTResponse(prompt);
        res.status(200).json({ response: gptResponse });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching GPT response' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  