// const { GoogleGenAI } = require("@google/genai");
// const dotenv = require('dotenv');

// dotenv.config();

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// const aiCodeReview = async (code) => {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements and suggestions for the code. " + code,
//     });
//     return response.text;
// };

// module.exports = {
//     aiCodeReview,
// };



// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=gemini_api" \
//   -H 'Content-Type: application/json' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'


const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const aiCodeReview = async (code) => {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements:\n\n${code}`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        const response = await result.response;
        const text = await response.text();  // <-- this returns the actual text
        return text;
    } catch (err) {
        console.error("Gemini API Error:", err.message);
        throw err;
    }
};

module.exports = {
    aiCodeReview,
};
