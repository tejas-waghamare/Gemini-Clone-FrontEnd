import { createSlice, nanoid } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        value: []
    },

    reducers: {
          setMessages: (state, action) => {
            state.value = [...action.payload]
        },
        addMessage: (state, action) => {
            state.value.push(action.payload)
        },
    }
})

export const { addMessage,setMessages } = messagesSlice.actions

export default messagesSlice.reducer