import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    ThemeProvider,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';
import { FaDollarSign, FaTrash } from 'react-icons/fa';

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
                <CardBody className='p-4 text-gray-900 text-center'>
                    <Typography align='center' variant='h5'>Total Balance RM100</Typography>
                    <Typography variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                        Try saying: Add income for $100 in Category Salary for Monday ...
                    </Typography>
                    <br />
                    <hr className="my-5 border-t border-gray-300" />
                    {/* Form */}
                </CardBody>
                <CardBody className="group rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <IconButton className='rounded-full bg-green-500 flex items-center justify-center'>
                                    <FaDollarSign className='text-white' />
                                </IconButton>
                            </ListItemPrefix>
                            <div className="ml-4">
                                <Typography variant="h6" color="blue-gray">
                                    Salary
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    $500 - 2025-01-16
                                </Typography>
                            </div>
                            <ListItemSuffix>
                                <IconButton variant="text" color="blue-gray">
                                    <FaTrash />
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    </List>
                </CardBody>
            </Card >
        </ThemeProvider >
    );
};

export default ExpenseTracker;
