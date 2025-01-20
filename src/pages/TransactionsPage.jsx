import React, { useContext, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton
} from '@material-tailwind/react';
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

    const dummyData = [
        { id: 1, category: "Salary", amount: 1000, date: "2022-12-01", type: "Income" },
        { id: 2, category: "Rent", amount: 500, date: "2022-12-02", type: "Expense" },
        { id: 3, category: "Grocery", amount: 150, date: "2022-12-03", type: "Expense" },
        { id: 4, category: "Freelancing", amount: 800, date: "2022-12-04", type: "Income" },
    ];

    return (
        <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-foreground">
            <h2 className="text-center text-base font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Expenses Tracker</p>
            <p className="text-center text-base mt-5">Try saying: Add income for $100 in Category Salary for Monday ...</p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-3">

                {/* Expense Tracker */}
                <div className="relative lg:order-1 lg:row-span-2 w-auto text-foreground">
                    <TransactionsForm />
                </div>

                {/* Other column */}
                <div className="relative lg:order-1 lg:row-span-2 py-1.5 px-3 text-sm font-normal my-5 mx-3 overflow-y-scroll">
                    {loading && (
                        <div className="flex justify-center items-center">
                            <FaSpinner className="fa-spin text-blue-500 text-3xl" />
                        </div>
                    )}
                    <TransactionsList transactions={transactions} />

                    <List className='hover-none'>
                        {dummyData.map((item) => (
                            <ListItem key={item.id} className='mb-3'>
                                <ListItemPrefix>
                                    <IconButton className={`rounded-full flex items-center justify-center ${item.type === 'Income' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        <FaDollarSign className='text-white' />
                                    </IconButton>
                                </ListItemPrefix>
                                <div className="ml-4">
                                    <Typography variant="h6">
                                        {item.category}
                                    </Typography>
                                    <Typography variant="small" className="font-normal">
                                        {item.amount} - ${item.date}
                                    </Typography>
                                </div>
                                <ListItemSuffix>
                                    <IconButton variant="text" className="rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                                        <FaTrash />
                                    </IconButton>
                                </ListItemSuffix>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
