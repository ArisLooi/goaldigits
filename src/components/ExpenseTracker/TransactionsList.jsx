import React from 'react';
import { useDispatch } from 'react-redux';
import { FaDollarSign, FaTrash } from 'react-icons/fa';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

export default function TransactionsList({ transactions }) {

    const dispatch = useDispatch();

    const handleDelete = async (transactionid, uid) => {
        try {
            const response = await dispatch(deleteTransaction({ transactionid })).unwrap();
            console.log("Delete response: ", response);
            if (response === transactionid) {
                toast.success("Transaction successfully deleted"); // Delay fetching transactions to let the toast display 
                setTimeout(() => dispatch(fetchTransactionsByUser(uid)), 500);
            } else {
                toast.error("Failed to delete transaction");
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('An error occurred while trying to delete the transaction.');
        }
    };

    console.log("Transactions in TransactionsList: ", transactions);

    return (
        <List className='hover-none'>
            {transactions.map((transaction) => {
                const { amount, transactiondate, type, categoryid, transactionid, uid } = transaction;

                return (
                    <ListItem key={transactionid}>
                        <ListItemPrefix>
                            <IconButton className={`rounded-full flex items-center justify-center ${type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                                <FaDollarSign className='text-white' />
                            </IconButton>
                        </ListItemPrefix>
                        <div className="ml-4">
                            <Typography variant="h6">
                                {categoryid}
                            </Typography>
                            <Typography variant="small" className="font-normal">
                                {amount} - ${transactiondate}
                            </Typography>
                        </div>
                        <ListItemSuffix>
                            <IconButton onClick={() => handleDelete(transactionid, uid)} variant="text" className="rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                                <FaTrash />
                            </IconButton>
                        </ListItemSuffix>
                    </ListItem>
                )
            })}
        </List>
    );
}
