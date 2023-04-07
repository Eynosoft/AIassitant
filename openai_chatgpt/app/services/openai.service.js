//const { getCompletion } = require("gpt3");
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
//const OpenAI = require('openai-api');
//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//const openai = new OpenAI(OPENAI_API_KEY);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
module.exports = {
    getDataOpenAi,
};
async function getDataOpenAi(req) {
    const param = req.body;
    console.log(param.animal);
    
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-001",
            prompt: param.animal,
            temperature: 0.4,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        //const response = await getCompletion(param.animal);
        /*const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Says this is a test",
            temperature: 0,
            max_tokens: 7
        })*/
        return response.data.choices[0].text;
    }
    catch (err) {
        console.log(err.message)
    }
  
}