import React, { useContext } from 'react'
import { FaDollarSign, FaTrash } from 'react-icons/fa';
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';

const TransactionsList = () => {
    const transactions = [
        { id: 1, type: 'income', category: 'Salary', amount: 500, date: '2025-01-16', },
        { id: 2, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 3, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 4, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 5, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 6, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 7, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 8, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 9, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 10, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
        { id: 11, type: 'expense', category: 'Food', amount: 50, date: '2025-01-16', },
    ]
    // const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
    return (
        < List className='hover-none '>
            {transactions.map((transaction) => (

                <ListItem key={transaction.id}>
                    <ListItemPrefix>
                        <IconButton className={`rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <FaDollarSign className='text-white' />
                        </IconButton>
                    </ListItemPrefix>
                    <div className="ml-4">
                        <Typography variant="h6" >
                            {transaction.category}
                        </Typography>
                        <Typography variant="small" className="font-normal">
                            {`$${transaction.amount} - ${transaction.date}`}
                        </Typography>
                    </div>
                    <ListItemSuffix>
                        <IconButton variant="text" className="rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                            <FaTrash />
                        </IconButton>
                    </ListItemSuffix>

                </ListItem>

            ))

            }

        </List >
    )
}

export default TransactionsList;