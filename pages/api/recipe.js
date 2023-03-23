import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
// const {NextApiRequest, NextApiResponse} = require('next');

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res){
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).json({error:"Prompt missing"});
    }
    if (prompt.length > 100) {
        return res.status(400).json({error:"Prompt too long"});
    }
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest a food recipe based on the following prompt (if you cannot suggest any recipe, make one yourself):\n
        Prompt: ${prompt}\n
        Recipe:`,
        max_tokens: 1024,
        temperature: 0.25,
        presence_penalty: 0,
        frequency_penalty: 0,
    });
    const recipe = completion.data.choices[0].text;
    res.status(200).json({ recipe });
}

