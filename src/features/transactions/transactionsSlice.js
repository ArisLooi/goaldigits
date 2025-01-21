import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../config/firebase';

const BACKEND_URL = import.meta.env.VITE_BACKEND

// Async thunk to create a transaction
export const createTransaction = createAsyncThunk(
    "transactions/createTransaction",
    async ({ uid, category, amount, transactiondate, description, type, image_url }) => {
        const data = { uid, category, amount, transactiondate, description, type, image_url };
        const response = await axios.post(`${BACKEND_URL}/transactions`, data);
        return response.data;
    }
);

// Async thunk to read a user's transactions
export const fetchTransactionsByUser = createAsyncThunk(
    "transactions/fetchByUser",
    async (uid) => {
        const response = await fetch(`${BACKEND_URL}/transactions/uid/${uid}`);
        return response.json(); //return response.json();
    }
);

// Async thunk to update a transaction
export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async ({ transactionid, newTransaction, newFile }) => {
        try {
            // Upload the new file to the storage if it exists and get its URL
            let newImageUrl;
            if (newFile) {
                const imageRef = ref(storage, `transactions/${newFile.name}`);
                const response = await uploadBytes(imageRef, newFile);
                newImageUrl = await getDownloadURL(response.ref);
            }

            const updatedData = {
                ...newTransaction,
                image_url: newImageUrl || newTransaction.image_url,
            };

            const response = await axios.put(`${BACKEND_URL}/transactions/${transactionid}`, updatedData);
            return response.data;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

// Async thunk to delete a transaction
export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
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
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            })
            .addCase(fetchTransactionsByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                const deletedtransactionid = action.payload;
                state.transactions = state.transactions.filter((transaction) => transaction.transactionid !== deletedtransactionid);
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const updatedTransaction = action.payload;
                const transactionIndex = state.transactions.findIndex(
                    (transaction) => transaction.id === updatedTransaction.id);
                if (transactionIndex !== -1) {
                    state.transactions[transactionIndex] = updatedTransaction;
                }
            })


    }
});

// Async thunk to add transaction 

export default transactionsSlice.reducer;


