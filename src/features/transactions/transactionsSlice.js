import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BACKEND_URL = import.meta.env.VITE_BACKEND

// Async thunk to create a post

// Async thunk to call a user's transactions
export const fetchTransactionsByUser = createAsyncThunk(
    "transactions/fetchByUser",
    async (uid) => {
        const response = await fetch(`${BACKEND_URL}/transactions/uid/${uid}`);
        return response.json();
    }
);

// Async thunk to update a transaction

// Async thunk to delete a transaction


const transactionsSlice = createSlice({
    name: "transactions",
    initialState: { transactions: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.loading = false;
        })
    }
});


export default transactionsSlice.reducer;


