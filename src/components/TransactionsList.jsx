import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaDollarSign, FaTrash, FaRegEdit } from 'react-icons/fa';
import { deleteTransaction, fetchTransactionsByUser } from '../features/transactions/transactionsSlice';
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import UpdateTransactionModal from './UpdateTransactionModal';

export default function TransactionsList({ transactions, refreshTransactions }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    const handleUpdate = (transaction) => {
        console.log('Opening modal for transaction:', transaction);
        setCurrentTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };

    const handleDelete = async (transactionid, uid) => {
        try {
            const response = await dispatch(deleteTransaction({ transactionid })).unwrap();
            if (response === transactionid) {
                toast.success("Transaction successfully deleted");
                setTimeout(() => dispatch(fetchTransactionsByUser(uid)), 500);
            } else {
                toast.error("Failed to delete transaction");
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('An error occurred while trying to delete the transaction.');
        }
    };

    return (
        <>
            <List className='hover-none'>
                {transactions.map((transaction) => {
                    const { amount, transactiondate, type, categoryid, transactionid, uid } = transaction;

                    return (
                        <ListItem key={transactionid} className='mb-3'>
                            <ListItemPrefix>
                                <IconButton className={`rounded-full flex items-center justify-center ${type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    <FaDollarSign className='text-white' />
                                </IconButton>
                            </ListItemPrefix>
                            <div className="ml-4">
                                <Typography variant="h6">
                                    {categoryid || 'No Category'}
                                </Typography>
                                <Typography variant="small" className="font-normal">
                                    {amount} - {transactiondate || 'No Date'}
                                </Typography>
                            </div>
                            <ListItemSuffix>
                                <div className="flex space-x-2">
                                    <IconButton onClick={() => handleUpdate(transaction)} variant="text" className="align-right rounded-full flex items-center justify-center text-foreground hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                                        <FaRegEdit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(transactionid, uid)} variant="text" className="rounded-full flex items-center justify-center text-foreground hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                                        <FaTrash />
                                    </IconButton>
                                </div>
                            </ListItemSuffix>
                        </ListItem>
                    );
                })}
            </List>
            {currentTransaction && (
                <UpdateTransactionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    transaction={currentTransaction}
                    refreshTransactions={refreshTransactions}
                />
            )}
        </>
    );
}
