import MessagesReducer from '../features/messagesSlice.js'
import ChatReducer from "../features/chatSlice.js"
import authReducer from "../features/authSlice.js"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        messages: MessagesReducer,
        chats: ChatReducer,
        auth: authReducer
    }
});