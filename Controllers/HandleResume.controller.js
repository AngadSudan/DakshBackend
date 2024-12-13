const dotenv = require('dotenv');
dotenv.config();
const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI= new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const fs= require('fs');
const pdf= require('pdf-parse');
const model= genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ResumeScore= async (req, res) => {
    try {
        const filepath= req.file.path;
        if(!filepath) return res.status(244).send('No file uploaded');
        
        const data= fs.readFileSync(filepath);
        const resume= await pdf(data).then((data)=>{ return data.text });
        
        const prompt='Scan this resume data and return me an ATS Score based on the contents. Keep the checking tight and strict. Here is the data' + resume + 'The response must only be a json consisting of 2 fields. score and message. Score must the ATS Score out of 100 and the message must be an array consiting of how you can increase the score. Keep the number of improvements to atmax 3 at the time. Also check if the data is not a resume data, then set the score to 0 abd the message to a list containing the error message. The error message must be "The data provided is not a resume data. Please provide a valid resume data. in the response text, make sure to use only single quoteations or double quotations, dont use both.';

        
        const result= await model.generateContent(prompt);
        const output= result.response.text();
        res.status(244).send(output.substring(8, output.length-4));    
    } catch (error) {
        console.log(error);
        
        res.status(244).send('Error inside the function');   
    }
}

module.exports = {
    ResumeScore
}        