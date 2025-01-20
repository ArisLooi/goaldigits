import React, { useContext, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from '@material-tailwind/react';
import { FaSpinner } from 'react-icons/fa';
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
            // console.log("Current User in Transaction", currentUser)
            dispatch(fetchTransactionsByUser(currentUser.uid));
        }
    }, [dispatch, currentUser]);

    return (
        <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Your Transactions</p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-3">

                {/* Expense Tracker */}
                <div className="relative lg:order-1 lg:row-span-2 min-h-[70rem] text-foreground ">
                    <Card className='bg-transparent'>
                        <CardHeader className='shadow-none bg-transparent'>
                            <Typography variant='h4'>Expenses Tracker</Typography>
                        </CardHeader>
                        <CardBody className='p-1 text-center'>
                            <Typography align='center' variant='h5'>Total Balance RM100</Typography>
                            <Typography variant='paragraph' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                                Try saying: Add income for $100 in Category Salary for Monday ...
                            </Typography>
                            <br />
                            <hr className="my-5 border-t border-gray-300" />
                            <TransactionsForm />
                        </CardBody>

                    </Card>
                </div>

                {/* Other column */}
                <div className="relative lg:order-1 lg:row-span-2">
                    <div className="absolute inset-px rounded-lg"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                        <div className="absolute inset-x-10 bottom-0 top-10">
                            <CardBody className="group rounded-none py-1.5 px-3 text-sm font-normal mt-5 overflow-y-scroll">
                                {loading && (
                                    <div className="flex justify-center items-center">
                                        <FaSpinner className="fa-spin text-blue-500 text-3xl" />
                                    </div>
                                )}
                                <TransactionsList transactions={transactions} />

                            </CardBody>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
