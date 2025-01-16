import React, { useState } from 'react';

export default function TransactionsPage() {
    const [expenses, setExpenses] = useState([]);
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const addExpense = () => {
        if (expenseDescription.trim() === '' || isNaN(expenseAmount)) {
            alert('Please enter a valid expense description and amount.');
            return;
        }
        const newExpense = {
            description: expenseDescription,
            amount: expenseAmount,
        };
        setExpenses([...expenses, newExpense]);
        setExpenseDescription('');
        setExpenseAmount('');
    };

    const editExpense = (index) => {
        const newDescription = prompt('Enter new description:', expenses[index].description);
        const newAmount = prompt('Enter new amount:', expenses[index].amount);
        if (newDescription !== null && newAmount !== null) {
            const updatedExpenses = expenses.map((expense, i) =>
                i === index ? { ...expense, description: newDescription, amount: newAmount } : expense
            );
            setExpenses(updatedExpenses);
        }
    };

    const deleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 border-2 border-green-600">
            <h1 className="text-3xl font-bold text-center mb-8">Expense Tracker</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="expense" className="text-lg font-semibold mb-2">Expense Description:</label>
                <input
                    type="text"
                    id="expense"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="amount" className="text-lg font-semibold mb-2">Amount (INR):</label>
                <input
                    type="number"
                    id="amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
                />
            </div>
            <button
                onClick={addExpense}
                className="bg-green-500 text-white px-6 py-2 rounded-md self-center mt-4 focus:outline-none"
            >
                Add Expense
            </button>
            <div id="expenseList" className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Expense List:</h2>
                <ul id="expenses" className="list-disc pl-6">
                    {expenses.map((expense, index) => (
                        <li key={index} className="mb-2">
                            {expense.description}: ₹{expense.amount}
                            <button
                                onClick={() => editExpense(index)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2 focus:outline-none"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteExpense(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md ml-2 focus:outline-none"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
