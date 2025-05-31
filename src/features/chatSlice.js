import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        value: [
            {
                _id: 1,
                name: 'Chat 1',
            },
            {
                _id: 2,
                name: 'Chat 2',
            },
            {
                _id: 3,
                name: 'Chat 3',
            }
        ]
    },

    reducers: {
        setChats: (state, action) => {
            state.value = [...action.payload]
        },

      

        createNewChat: (state, action) => {
            state.value.push(   action.payload)
        },
        deleteChat: (state, action) => {
            state.value = state.value.filter(chat => chat.id !== action.payload)
        }
    }
});

export const { createNewChat, deleteChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;