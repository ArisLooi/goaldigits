import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND

// Async thunk to create a post

// Async thunk to call a user's transactions
export const fetchTransactionsByUser = createAsyncThunk(
    "transactions/fetchByUser",
    async (uid) => {
        const response = await fetch(`${backendUrl}/transactions/${uid}`);
        return response.json();
    }
);

// Slice
const transactionsSlice = createSlice({
    name: "transactions",
    initialState: { transactions: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
            state.post = action.payload;
            state.loading = false;
        })
    }
})

export default transactionsSlice.reducer;

// Async thunk to update a transaction

// Async think to delete a transaction