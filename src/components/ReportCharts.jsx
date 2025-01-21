import React from 'react';
import { Card, CardHeader, CardBody, Typography, Table, TableRow, TableCell, TableBody, TableHead } from "@material-tailwind/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
    const netWorth = 5000; // Example net worth

    const incomeCategories = [
        { category: 'Salary', amount: 2000 },
        { category: 'Business', amount: 1500 },
        { category: 'Investments', amount: 1000 }
    ];

    const expenseCategories = [
        { category: 'Rent', amount: 800 },
        { category: 'Groceries', amount: 600 },
        { category: 'Utilities', amount: 400 },
        { category: 'Entertainment', amount: 200 }
    ];

    const monthlyIncome = [
        { month: 1, amount: 1000 },
        { month: 2, amount: 1200 },
        { month: 3, amount: 1500 }
    ];

    const monthlyExpense = [
        { month: 1, amount: 700 },
        { month: 2, amount: 800 },
        { month: 3, amount: 900 }
    ];

    const recentTransactions = [
        { transactiondate: '2025-01-01', category: 'Salary', type: 'income', amount: 2000 },
        { transactiondate: '2025-01-02', category: 'Rent', type: 'expense', amount: 800 },
        { transactiondate: '2025-01-03', category: 'Groceries', type: 'expense', amount: 600 }
    ];

    const incomeData = {
        labels: incomeCategories.map(c => c.category),
        datasets: [
            {
                data: incomeCategories.map(c => c.amount),
                backgroundColor: ['#4caf50', '#66bb6a', '#81c784'],
                borderWidth: 1,
            },
        ],
    };

    const expenseData = {
        labels: expenseCategories.map(c => c.category),
        datasets: [
            {
                data: expenseCategories.map(c => c.amount),
                backgroundColor: ['#f44336', '#e57373', '#ef9a9a', '#ffcdd2'],
                borderWidth: 1,
            },
        ],
    };

    const monthlyIncomeData = {
        labels: monthlyIncome.map(c => `Month ${c.month}`),
        datasets: [
            {
                label: 'Monthly Income',
                data: monthlyIncome.map(c => c.amount),
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1,
            },
        ],
    };

    const monthlyExpenseData = {
        labels: monthlyExpense.map(c => `Month ${c.month}`),
        datasets: [
            {
                label: 'Monthly Expense',
                data: monthlyExpense.map(c => c.amount),
                backgroundColor: 'rgba(244, 67, 54, 0.6)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Net Worth</Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography variant='h5'>RM{netWorth}</Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Income</Typography>
                    </CardHeader>
                    <CardBody>
                        <Doughnut data={incomeData} />
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Expense</Typography>
                    </CardHeader>
                    <CardBody>
                        <Doughnut data={expenseData} />
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Monthly Income</Typography>
                    </CardHeader>
                    <CardBody>
                        <Bar data={monthlyIncomeData} />
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Monthly Expense</Typography>
                    </CardHeader>
                    <CardBody>
                        <Bar data={monthlyExpenseData} />
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <Card>
                    <CardHeader>
                        <Typography variant='h4'>Recent Transactions</Typography>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentTransactions.map(transaction => (
                                    <TableRow key={transaction.transactiondate}>
                                        <TableCell>{transaction.transactiondate}</TableCell>
                                        <TableCell>{transaction.category}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>RM{transaction.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
