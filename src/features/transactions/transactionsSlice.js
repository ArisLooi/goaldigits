import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND

// Async thunk to create a transaction

// Async thunk to read a user's transactions
export const fetchTransactionsByUser = createAsyncThunk(
    "transactions/fetchByUser",
    async (uid) => {
        const response = await fetch(`${BACKEND_URL}/transactions/uid/${uid}`);
        return response.json();
    }
);

// Async thunk to update a transaction



// Async thunk to delete a transaction
export const deleteTransactions = createAsyncThunk(
    "transactions/deleteTransactions",
    async ({ transactionid }) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/transactions/${transactionid}`);
            return transactionid;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: { transactions: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(deleteTransactions.fulfilled, (state, action) => {
                const deletedtransactionid = action.payload;
                state.transactions = state.transactions.filter((transaction) => transaction.transactionid !== deletedtransactionid);
            })

    }
});


export default transactionsSlice.reducer;


