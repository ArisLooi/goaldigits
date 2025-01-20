import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    ThemeProvider
} from '@material-tailwind/react';

import TransactionsForm from './TransactionsForm';
import TransactionsList from './TransactionsList';

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
                    <TransactionsList />
                </CardBody>

            </Card >
        </ThemeProvider >
    );
};

export default ExpenseTracker;
