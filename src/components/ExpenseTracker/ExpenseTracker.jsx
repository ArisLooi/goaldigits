import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    ThemeProvider
} from '@material-tailwind/react';
import { FaSpinner } from 'react-icons/fa';
import TransactionsForm from './TransactionsForm';
import TransactionsList from './TransactionsList';
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsByUser } from "../../features/transactions/transactionsSlice";
import { AuthContext } from "../../context/AuthProvider";


const expenseTrackerTheme = {
    media: {
        height: "h-0",
        paddingTop: "pt-9/16",
    },
    expand: {
        transform: "rotate-0",
        marginLeft: "ml-auto",
        transition: "transition-transform duration-200 ease-in-out", // Assuming 200ms as shortest
    },
    expandOpen: {
        transform: "rotate-180",
    },
    cardContent: {
        paddingTop: "pt-0",
    },
    hr: {
        margin: "my-5", // 20px (1.25rem) top and bottom margin
    },
};

const ExpenseTracker = () => {
    const theme = expenseTrackerTheme;
    const dispatch = useDispatch();
    const transactions = useSelector(store => store.transactions.transactions)
    const loading = useSelector(store => store.transactions.loading)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        // console.log("Current User", currentUser)
        if (currentUser) {
            dispatch(fetchTransactionsByUser(currentUser.uid));
        }
    }, [dispatch, currentUser]);

    console.log("Transactions: ", transactions);

    return (
        <ThemeProvider value={theme}>
            <Card className='text-gray-900'>
                <CardHeader className='text-gray-900 shadow-none'>
                    <Typography variant='h4'>Expenses Tracker</Typography>
                </CardHeader >
                <CardBody className='p-1 text-gray-900 text-center'>
                    <Typography align='center' variant='h5'>Total Balance RM100</Typography>
                    <Typography variant='paragraph' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                        Try saying: Add income for $100 in Category Salary for Monday ...
                    </Typography>
                    <br />
                    <hr className="my-5 border-t border-gray-300" />
                    <TransactionsForm />
                </CardBody>

                <CardBody className="group rounded-none py-1.5 px-3 text-sm font-normal mt-5 h-40 overflow-y-scroll " >
                    {loading && (
                        <FaSpinner animation="border" className="ms-3 mt-3 align-center justify-center" variant="primary" />
                    )}

                    <TransactionsList transactions={transactions} />

                </CardBody>

            </Card >
        </ThemeProvider >
    );
};

export default ExpenseTracker;
