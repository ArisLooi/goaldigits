import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider'

export default function TransactionsPage() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [description, setDescription] = useState('');
    const { currentUser } = useContext(AuthContext);
    const backendUrl = import.meta.env.VITE_BACKEND + '/transactions'

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentUser) {
            const data = {
                uid: currentUser.uid,
                accountid: 7,
                categoryid: 1,
                amount: 1000,
                transactiondate: '17-01-2025',
                description: 'testing',
                type: 'income',

            }

            try {
                await axios.post(backendUrl, data)
                    .then((response) => {
                        console.log("Success:", response.data);
                    })
            } catch (error) {
                console.error('Error adding transaction:', error);
            }
        }
    };

    return (
        <div className="bg-background p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 ">
            <h1 className="text-3xl font-bold text-center mb-8">Transaction Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="text-lg font-semibold mb-2">Transaction Type:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="amount" className="text-lg font-semibold mb-2">Amount (MYR):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="description" className="text-lg font-semibold mb-2">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md self-center mt-4 focus:outline-none"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

