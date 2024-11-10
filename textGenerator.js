const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

async function textGenTextOnlyPromptStreaming(promptValue) {
 
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let genText= "";


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    //const prompt = "Write a story about a magic backpack.";
    const prompt = promptValue;
  
    const result = await model.generateContentStream(prompt);
  
    // Print text as it comes in.
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      //process.stdout.write(chunkText);
      genText += chunkText; 
      
    }
  //  console.log("Generated Text:", genText);
    return genText;

}

module.exports = {
    textGenTextOnlyPromptStreaming
  };
