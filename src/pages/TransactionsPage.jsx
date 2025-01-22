import React, { useContext, useEffect, useState } from 'react';
import { FaDollarSign, FaTrash, FaSpinner } from 'react-icons/fa';
import TransactionsForm from '../components/TransactionsForm';
import TransactionsList from '../components/TransactionsList';
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsByUser } from "../features/transactions/transactionsSlice";
import { AuthContext } from "../context/AuthProvider";

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(store => store.transactions.transactions);
    const loading = useSelector(store => store.transactions.loading);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchTransactionsByUser(currentUser.uid));
        }
    }, [dispatch, currentUser]);

    const refreshTransactions = () => {
        if (currentUser) {
            dispatch(fetchTransactionsByUser(currentUser.uid));
        }
    };

    const sortedTransactions = transactions.error == undefined ? [...transactions].sort((a, b) => new Date(b.transactiondate) - new Date(a.transactiondate)) : []
    // console.log("TransactionsXYS", transactions.error, transactions, sortedTransactions)

    return (
        <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-foreground">
            <h2 className="text-center text-base font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Expenses Tracker</p>
            <p className="text-center text-base mt-5">Try saying: Add income for $100 in Category Salary for Monday ...</p>
            <div className="mt-10 grid gap-1 sm:mt-16 lg:grid-cols-2 lg:grid-rows-1">

                {/* Expense Tracker */}
                <div className="bg-background p-4 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-autotext-foreground">
                    <TransactionsForm refreshTransactions={refreshTransactions} />
                </div>

                {/* Transactions List */}
                <div className="relative lg:order-1 lg:row-span-2 py-3 px-1 text-sm my-5 lg:mx-20 overflow-y-auto">
                    {loading && (
                        <div className="flex justify-center items-center">
                            <FaSpinner className="fa-spin text-blue-500 text-3xl" />
                        </div>
                    )}
                    <TransactionsList transactions={sortedTransactions} refreshTransactions={refreshTransactions} />
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
