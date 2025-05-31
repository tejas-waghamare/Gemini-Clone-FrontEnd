import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";


const GEMINI_API_KEY = "AIzaSyBo0LJ19qdChVKpkoFframmQCCHkJCuA8I";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getGeminiResponse = async (question) => {
    
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question,
    });

    const parsedResponse = await marked.parse(response.text)
    return parsedResponse;
}

export const createNewChatinDB = async (name) => {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user')
    if (!token || !user) return false;
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let data = {
        name,
        userId: user._id
    }

    try {
        const res = await axios.post('http://localhost:3000/api/v1/chat/create-chat', data, config);
        // const res = await axios.post('https://gemini-clone-backend-sandy.vercel.app/api/v1/chat/create-chat', data, config);


        if (res.data.status == 'success') {
            return res.data.data;
        }
        else {
            console.log(res.data.message);
            return false;
        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}


export const createNewMessageinDB = async (text, chatId, isGeminiResponse) => {
    let token = localStorage.getItem('token')

    if (!token) return false;
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let data = { text, chatId, isGeminiResponse }


    try {
        const res = await axios.post('http://localhost:3000/api/v1/message/create-message', data, config);
        // const res = await axios.post('https://gemini-clone-backend-sandy.vercel.app/api/v1/message/create-message', data, config);


        if (res.data.status == 'success') {
            return res.data.data;
        }
        else {
            console.log(res.data.message);
            return false;
        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}

export const getChatsofUser = async () => {
    let token = localStorage.getItem('token')
    if (!token) return false;
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const res = await axios.get('http://localhost:3000/api/v1/chat/get-chats', config);
        // const res = await axios.get('https://gemini-clone-backend-sandy.vercel.app/api/v1/chat/get-chats', config);

        if (res.data.status == 'success') {
            return res.data.data
        }
        else {
            return false;

        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}

export const getMessagesofChat = async (chatId) => {
    let token = localStorage.getItem('token')
    if (!token) return false;
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const res = await axios.get(`http://localhost:3000/api/v1/message/get-all-messages/${chatId}`, config);
        // const res = await axios.get(`https://gemini-clone-backend-sandy.vercel.app/api/v1/message/get-all-messages/${chatId}`, config);

        if (res.data.status == 'success') {
            return res.data.data;
        }
        else {
            console.log(res.data.message);
            return false;

        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}