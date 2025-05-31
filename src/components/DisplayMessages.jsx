import { useState, useEffect, useRef } from 'react';
import { useId } from 'react';
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setMessages } from '../features/messagesSlice';
import { marked } from 'marked';
import {
    createNewChatinDB,
    createNewMessageinDB,
    getChatsofUser,
    getGeminiResponse,
    getMessagesofChat
} from '../services/servics';
import { createNewChat, setChats } from '../features/chatSlice';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayMessages = () => {

    const newId = useId();
    const [formData, setFormData] = useState({ userInput: '' });

    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const messages = useSelector(state => state.messages.value);
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        (async function () {
            const userChats = await getChatsofUser();
            dispatch(setChats(userChats));
            const userMessages = await getMessagesofChat(chatId);
            dispatch(setMessages(userMessages));
        })();
    }, [chatId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.userInput.trim() === "") return;

        const input = formData.userInput;
        setFormData({ userInput: "" }); // Clear input immediately
        setIsLoading(true);

        try {
            if (chatId) {
                const newMessageUser = await createNewMessageinDB(input, chatId, false);
                dispatch(addMessage(newMessageUser));

                const answer = await getGeminiResponse(input);
                const newMessageGemini = await createNewMessageinDB(answer, chatId, true);
                dispatch(addMessage(newMessageGemini));
            } else {
                const newChatObj = await createNewChatinDB(input);
                dispatch(createNewChat(newChatObj));

                const newMessageUser = await createNewMessageinDB(input, newChatObj._id, false);
                dispatch(addMessage(newMessageUser));

                const answer = await getGeminiResponse(input);
                const newMessageGemini = await createNewMessageinDB(answer, newChatObj._id, true);
                dispatch(addMessage(newMessageGemini));

                navigate(`/${newChatObj._id}`);
            }
        } catch (error) {
            console.error("Error while sending message: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col w-full h-[90%] bg-gray-900'>
            <div className='h-4/5 max-h-4/5 w-4/5 mx-auto overflow-y-scroll mb-4 mt-5  rounded-2xl py-5 bg-white flex flex-col'>
                {
                    messages.length > 0 ? messages.map(msg => (
                        <div
                            key={msg._id}
                            className={`w-full flex ${msg.geminiResponse ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`p-4 mb-3 text-xl max-w-[95%] rounded-xl ${
                                    msg.geminiResponse
                                        ? 'bg-gray-200 text-black'
                                        : ' text-black'
                                }`}
                                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                            />
                        </div>
                    )) : (
                        <h2 className="text-center text-3xl font-semibold multicolor-text">
                            Hello, {user.name || 'user'}
                        </h2>
                    )
                }

                {isLoading && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                        <span className="ml-3 text-lg text-blue-600">Gemini is thinking...</span>
                    </div>
                )}

                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            <form className='flex items-center gap-4 w-3/4 mx-auto' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userInput"
                    id={newId}
                    className='text-xl border-2  w-full p-3 rounded-4xl bg-gray-100'
                    placeholder='Ask Gemini'
                    onChange={(e) => setFormData({ userInput: e.target.value })}
                    value={formData.userInput}
                />

                <button type='submit' className='text-3xl cursor-pointer text-white'>
                    <IoSend />
                </button>
            </form>
        </div>
    );
};

export default DisplayMessages;




// import { useState } from 'react';
// import { useId } from 'react'
// import { IoSend } from "react-icons/io5";
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { addMessage, setMessages } from '../features/messagesSlice';
// import { marked } from 'marked';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { createNewChat, setChats } from '../features/chatSlice';
// import { createNewChatinDB, createNewMessageinDB, getChatsofUser, getGeminiResponse, getMessagesofChat } from '../services/servics';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';

// const DisplayMessages = () => {

//     const newId = useId();
//     const [formData, setFormData] = useState({
//         userInput: ''
//     })

//     const token = useSelector(state => state.auth.token);
//     const user = useSelector(state => state.auth.user);
//     const messages = useSelector(state => state.messages.value);
//     const dispatch = useDispatch();
//     const { chatId } = useParams();
//     const navigate = useNavigate();



//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         (async function () {
//             const userChats = await getChatsofUser();
//             dispatch(setChats(userChats))
//             const userMessages = await getMessagesofChat(chatId);
//             dispatch(setMessages(userMessages))
//             // navigate('/new-chat')
//         })();

//     }, [chatId])



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.userInput == "") return;

//         if (chatId) {
//             const newMessageUser = await createNewMessageinDB(
//                 formData.userInput,
//                 chatId,
//                 false);
//             dispatch(addMessage(newMessageUser))
//             setFormData({ userInput: "" });

//             const answer = await getGeminiResponse(formData.userInput);
//             const newMessageGemini = await createNewMessageinDB(answer, chatId, true);
//             dispatch(addMessage(newMessageGemini));


//         } else {
//             const newChatObj = await createNewChatinDB(formData.userInput)
//             dispatch(createNewChat(newChatObj))
//             const newMessageUser = await createNewMessageinDB(
//                 formData.userInput,
//                 newChatObj._id,
//                 false
//             );
//             setFormData({ userInput: "" })
//             const answer = await getGeminiResponse(formData.userInput);
//             const newMessageGemini = await createNewMessageinDB(
//                 answer,
//                 newChatObj._id,
//                 true
//             );

//             navigate(`/${newChatObj._id}`);


//         }


//     };

//     return (
//         <div className='flex flex-col w-full h-[93%] bg-black '>
//             <div className='h-4/5 max-h-4/5 w-4/5 mx-auto overflow-y-scroll mb-4 mt-2  rounded-2xl py-5 bg-white  items-center justify-center'>
//                 {
//                     messages.length > 0 ?
//                         messages.map(msg => {
//                             return (
//                                 <div
//                                     key={msg._id}
//                                     className={`p-8 mb-2 text-xl text-left ${msg.geminiResponse ? 'text-start' : 'text-end'}`}
//                                     dangerouslySetInnerHTML={{ __html: msg.text }}
//                                 />
//                             );
//                         })
//                         :
//                         <h2 className="text-center text-3xl font-semibold multicolor-text ">Hello, {user.name || 'user'}</h2>
//                 }




//                 {isLoading && (<h2 className="text-2xl">Loading...</h2>)}
//             </div>

//             <form className='flex items-center gap-4 w-3/4 mx-auto' onSubmit={handleSubmit}>
//                 <input type="text" name="userInput" id={newId} className='text-xl border-2 w-full p-3 rounded-4xl bg-gray-100 ' placeholder='Ask Gemini'
//                     onChange={(e) => setFormData({

//                         userInput: e.target.value
//                     })}
//                     value={formData.userInput} />

//                 <button type='submit' className='text-3xl cursor-pointer text-white'>
//                     <IoSend />
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default DisplayMessages