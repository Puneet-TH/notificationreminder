import {GoogleGenAI} from '@google/genai';
import { apiError } from './apiError.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const searchGemini = async function (examName) {
 try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.0-flash-001',
       contents: `Check if ${examName} notification is out now. 
       Give: only the status, is notification out now or not just that keep it in minimum 2 lines
       and anything else not needed.
       `,
     });
     return response.text
 } catch (error) {
     throw new apiError(501, "unable to fetch from gemini")
 }
}

export {searchGemini}
