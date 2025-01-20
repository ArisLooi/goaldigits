import React from 'react';
import { FaDollarSign, FaTrash } from 'react-icons/fa';
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';

export default function TransactionsList({ transactions }) {

    console.log("Transactions in TransactionsList: ", transactions);

    return (
        <List className='hover-none'>
            {transactions.map((transaction) => (
                <ListItem key={transaction.transactionid}>
                    <ListItemPrefix>
                        <IconButton className={`rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <FaDollarSign className='text-white' />
                        </IconButton>
                    </ListItemPrefix>
                    <div className="ml-4">
                        <Typography variant="h6">
                            {transaction.categoryid}
                        </Typography>
                        <Typography variant="small" className="font-normal">
                            {transaction.amount} - ${transaction.transactiondate}
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
    );
}
