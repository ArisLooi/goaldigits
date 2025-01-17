import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactions/transactionsSlice';

export default configureStore({
    reducer: {
        transactions: transactionsReducer,
    },
});